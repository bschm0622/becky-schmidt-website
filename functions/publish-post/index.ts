import { Octokit } from '@octokit/rest';
import type { PagesFunction } from '@cloudflare/workers-types';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  markdown: string;
}

export interface Env {
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  BLOG_PASSWORD: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatFrontMatter(post: BlogPost): string {
  return `---
title: ${post.title}
date: ${post.date}
excerpt: ${post.excerpt}
---

${post.markdown}
`;
}

// @ts-expect-error: Pages Functions have a different Response type than Workers
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // Get environment variables
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, BLOG_PASSWORD } = context.env;

    // Log environment variable presence (not values)
    console.log('Environment variables check:', {
      hasToken: !!GITHUB_TOKEN,
      hasOwner: !!GITHUB_OWNER,
      hasRepo: !!GITHUB_REPO,
      hasPassword: !!BLOG_PASSWORD
    });

    // Parse request body
    const request = await context.request.json() as BlogPost & { password: string };
    
    // Verify password
    if (request.password !== BLOG_PASSWORD) {
      console.log('Password verification failed');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If this is just a password validation request (empty title), return success
    if (!request.title.trim()) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Password validated successfully'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create Octokit instance
    const octokit = new Octokit({
      auth: GITHUB_TOKEN
    });

    // Test the GitHub token
    try {
      console.log('Testing GitHub token...');
      const { data: repo } = await octokit.repos.get({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO
      });
      console.log('GitHub token test successful, repo exists:', repo.full_name);
    } catch (error) {
      console.error('GitHub token test failed:', error);
      if (error.response) {
        console.error('GitHub API error details:', {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw error;
    }

    // Generate filename
    const slug = slugify(request.title);
    const filename = `src/content/blog/${slug}.md`;
    console.log('Generated filename:', filename);

    // Generate a unique branch name
    const branchName = `blog-post/${slug}-${Date.now()}`;
    console.log('Creating new branch:', branchName);

    try {
      // Get the master branch reference
      const { data: masterRef } = await octokit.git.getRef({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: 'heads/master'
      });

      // Create a new branch
      await octokit.git.createRef({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: `refs/heads/${branchName}`,
        sha: masterRef.object.sha
      });

      // Format content with front matter
      const content = formatFrontMatter({
        title: request.title,
        date: request.date,
        excerpt: request.excerpt,
        markdown: request.markdown
      });

      try {
        console.log('Attempting to create file with content length:', content.length);
        const createResponse = await octokit.repos.createOrUpdateFileContents({
          owner: GITHUB_OWNER,
          repo: GITHUB_REPO,
          path: filename,
          message: `Add new blog post: ${request.title}`,
          content: btoa(content),
          branch: branchName
        });
        console.log('GitHub API response:', createResponse.status, createResponse.data);

        // Create a pull request
        const { data: pullRequest } = await octokit.pulls.create({
          owner: GITHUB_OWNER,
          repo: GITHUB_REPO,
          title: `Add blog post: ${request.title}`,
          head: branchName,
          base: 'master',
          body: `New blog post: ${request.title}\n\nExcerpt: ${request.excerpt}`
        });

        console.log('Created pull request:', pullRequest.html_url);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Pull request created successfully',
          pullRequestUrl: pullRequest.html_url,
          slug 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (createError) {
        console.error('Error creating file:', createError);
        if (createError.response) {
          console.error('GitHub API error details:', {
            status: createError.response.status,
            data: createError.response.data
          });
        }
        throw createError;
      }
    } catch (error) {
      console.error('Error in branch or PR creation:', error);
      if (error.response) {
        console.error('GitHub API error details:', {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw error;
    }

    // If we get here, something unexpected happened
    console.error('Unexpected flow - could not create or update file');
    return new Response(JSON.stringify({ 
      error: 'Failed to process request',
      details: 'Could not create or update file'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to publish post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 