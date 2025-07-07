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

    // Parse request body
    const request = await context.request.json() as BlogPost & { password: string };
    
    // Verify password
    if (request.password !== BLOG_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create Octokit instance
    const octokit = new Octokit({
      auth: GITHUB_TOKEN
    });

    // Generate filename
    const slug = slugify(request.title);
    const filename = `src/content/blog/${slug}.md`;

    // Format content with front matter
    const content = formatFrontMatter({
      title: request.title,
      date: request.date,
      excerpt: request.excerpt,
      markdown: request.markdown
    });

    try {
      // Try to get existing file
      const { data: existingFile } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: filename,
      });

      if ('content' in existingFile) {
        // Update existing file
        await octokit.repos.createOrUpdateFileContents({
          owner: GITHUB_OWNER,
          repo: GITHUB_REPO,
          path: filename,
          message: `Update blog post: ${request.title}`,
          content: Buffer.from(content).toString('base64'),
          sha: existingFile.sha,
          branch: 'main'
        });

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Post updated successfully',
          slug 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      // File doesn't exist, create new one
      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: filename,
        message: `Add new blog post: ${request.title}`,
        content: Buffer.from(content).toString('base64'),
        branch: 'main'
      });

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Post created successfully',
        slug 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If we get here, something unexpected happened
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