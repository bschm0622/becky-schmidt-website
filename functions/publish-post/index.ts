import { Octokit } from '@octokit/rest';
import type { PagesFunction } from '@cloudflare/workers-types';

interface BlogPostRequest {
  password: string;
  title: string;
  date: string;
  excerpt: string;
  markdown: string;
}

interface Env {
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  BLOG_PASSWORD: string;
  ASSETS: {
    fetch: (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => Promise<Response>;
  };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to handle Unicode characters in base64 encoding
function base64EncodeUnicode(str: string) {
  // First we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    )
  );
}

// Helper function to format front matter
function formatFrontMatter(data: { 
  title: string; 
  date: string; 
  excerpt: string; 
  markdown: string; 
}): string {
  return `---
title: ${data.title}
publishDate: ${data.date}
excerpt: ${data.excerpt}
---

${data.markdown}`;
}

// @ts-expect-error: Pages Functions have a different Response type than Workers
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // Get environment variables
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, BLOG_PASSWORD } = context.env;

    // Get request data
    const request: BlogPostRequest = await context.request.json();

    // Validate password
    if (!request.password || request.password !== BLOG_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Log environment variables check (without exposing values)
    console.log('Environment variables check:', {
      hasToken: !!GITHUB_TOKEN,
      hasOwner: !!GITHUB_OWNER,
      hasRepo: !!GITHUB_REPO,
      hasPassword: !!BLOG_PASSWORD
    });

    // Test GitHub token
    console.log('Testing GitHub token...');
    const repoResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!repoResponse.ok) {
      throw new Error('GitHub token test failed: Invalid token or repository not found');
    }

    console.log('GitHub token test successful, repo exists:', `${GITHUB_OWNER}/${GITHUB_REPO}`);

    // Generate filename from title
    const slug = request.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const filename = `src/content/blog/${slug}.md`;
    console.log('Generated filename:', filename);

    // Format the content with front matter
    const content = formatFrontMatter({
      title: request.title,
      date: request.date,
      excerpt: request.excerpt,
      markdown: request.markdown
    });

    // Get the main branch SHA
    const mainBranchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/master`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!mainBranchResponse.ok) {
      const errorData = await mainBranchResponse.json();
      throw new Error(`Failed to get main branch: ${errorData.message || mainBranchResponse.statusText}`);
    }

    const mainBranchData = await mainBranchResponse.json();
    const mainBranchSha = mainBranchData.object.sha;

    // Generate branch name with timestamp
    const timestamp = Date.now();
    const branchName = `blog-post/${slug}-${timestamp}`;

    try {
      console.log("Creating new branch:", branchName);
      
      const createBranchResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: mainBranchSha,
          }),
        }
      );

      if (!createBranchResponse.ok) {
        const errorData = await createBranchResponse.json();
        throw new Error(`Failed to create branch: ${errorData.message || createBranchResponse.statusText}`);
      }

      // Create the file in the new branch
      const fileContent = base64EncodeUnicode(content);
      
      try {
        console.log("Attempting to create file with content length:", content.length);
        
        const createFileResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filename}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add new blog post: ${request.title}`,
              content: fileContent,
              branch: branchName,
            }),
          }
        );

        if (!createFileResponse.ok) {
          const errorData = await createFileResponse.json();
          throw new Error(`Failed to create file: ${errorData.message || createFileResponse.statusText}`);
        }

        const responseData = await createFileResponse.json();
        console.log('GitHub API response:', createFileResponse.status, responseData);

        // Create pull request
        const createPrResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: `Add blog post: ${request.title}`,
              body: `Adding new blog post: ${request.title}\n\nAutomatically generated PR from blog editor.`,
              head: branchName,
              base: "master",
            }),
          }
        );

        if (!createPrResponse.ok) {
          const errorData = await createPrResponse.json();
          throw new Error(`Failed to create PR: ${errorData.message || createPrResponse.statusText}`);
        }

        const prData = await createPrResponse.json();
        console.log('Pull request created:', prData.html_url);

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Post submitted for review',
            prUrl: prData.html_url 
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (fileError: unknown) {
        if (fileError instanceof Error) {
          console.error('Error creating file:', fileError.message);
          throw new Error(`Failed to create file: ${fileError.message}`);
        }
        console.error('Error creating file:', String(fileError));
        throw new Error('Failed to create file: Unknown error');
      }

    } catch (branchError: unknown) {
      if (branchError instanceof Error) {
        console.error('Error in branch or PR creation:', branchError.message);
        return new Response(JSON.stringify({ error: branchError.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      console.error('Error in branch or PR creation:', String(branchError));
      return new Response(JSON.stringify({ error: 'Unknown error occurred' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error publishing post:', error.message);
      return new Response(JSON.stringify({ 
        error: 'Failed to publish post',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle non-Error objects
    const errorMessage = String(error);
    console.error('Error publishing post:', errorMessage);
    return new Response(JSON.stringify({ 
      error: 'Failed to publish post',
      details: 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 