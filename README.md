# Astro with Tailwind

```sh
npm create astro@latest -- --template with-tailwindcss
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/with-tailwindcss/devcontainer.json)

Astro comes with [Tailwind](https://tailwindcss.com) support out of the box. This example showcases how to style your Astro project with Tailwind.

For complete setup instructions, please see our [Tailwind Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind).

# Becky Schmidt's Personal Website

This is my personal portfolio website built with Astro and Tailwind CSS. It showcases my projects, skills, and experience as a product manager.

## 🚀 Features

- **Modern Design**: Clean, responsive layout built with Tailwind CSS
- **Blog Integration**: Integrated blog section for sharing thoughts and insights
- **SEO Optimized**: Comprehensive SEO implementation using astro-seo
- **Performance Focused**: Fast loading times with lazy-loaded images
- **Smooth Navigation**: Animated scrolling and intuitive navigation
- **Typewriter Effect**: Custom emoji-compatible typewriter animation on the homepage
- **Floating Navbar**: Interactive navigation with active section highlighting
- **Responsive Layout**: Mobile-first design with hamburger menu for smaller screens
- **Section Scrolling**: Smooth scrolling to sections with URL hash updates
- **Dark Mode Support**: Built-in light/dark mode theming

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - For interactive UI components
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations and transitions
- [astro-seo](https://github.com/jonasmerlin/astro-seo) - SEO optimization for Astro
- [Cloudflare Pages](https://pages.cloudflare.com/) - For fast, secure hosting and global CDN
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) - For deploying to Cloudflare Pages

## 📋 SEO Implementation

This website uses the `astro-seo` package for comprehensive SEO optimization:

- **Meta Tags**: Proper title, description, and canonical URL tags
- **OpenGraph**: Complete OpenGraph implementation for better social media sharing
- **Twitter Cards**: Optimized Twitter card implementation with large image format
- **Robots.txt**: Configured for proper search engine crawling
- **Sitemap**: Automatically generated sitemap using @astrojs/sitemap

## 🖼️ Images

- **OpenGraph Image**: Custom OpenGraph image for social media sharing
- **Lazy Loading**: All images use lazy loading for better performance
- **Optimized**: Images are properly sized and optimized for web
- **Async Decoding**: Images use the decoding="async" attribute for better performance

## 🧩 Components

- **Hero Section**: Featuring a typewriter effect with emoji support
- **Projects Section**: Showcasing portfolio projects with interactive cards
- **Resume Timeline**: Interactive resume with expandable sections
- **Blog Section**: Displaying latest blog posts with previews
- **Contact Section**: Easy-to-use contact form
- **Floating Navbar**: Responsive navigation with active section highlighting
- **Social Links**: Integrated social media links

## 🔧 Custom JavaScript

- **EmojiTypewriter**: Custom-built typewriter effect that properly handles emoji characters
- **Smooth Scrolling**: Enhanced scrolling behavior with section detection
- **URL Hash Management**: Updates URL hash without page jumps for better sharing
- **Intersection Observer**: Used for detecting active sections during scrolling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

This website is deployed on [Cloudflare Pages](https://pages.cloudflare.com/) using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):

```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

Cloudflare Pages provides:
- Global CDN for fast loading worldwide
- Automatic HTTPS with SSL certificates
- Edge caching for improved performance
- Custom domain support with DNS management

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Astro](https://astro.build/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [astro-seo](https://github.com/jonasmerlin/astro-seo) for the SEO optimization
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations
- [Cloudflare](https://www.cloudflare.com/) for the excellent hosting platform
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for the deployment CLI
