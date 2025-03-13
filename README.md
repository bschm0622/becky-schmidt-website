# Becky Schmidt's Personal Website

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/bschm0622/becky-schmidt-website)

This is my personal portfolio website built with Astro and Tailwind CSS. It showcases my projects, skills, and experience as a product manager.

## 🔗 Links

- **Live Website**: [beckyschmidt.me](https://beckyschmidt.me)
- **GitHub Repository**: [github.com/bschm0622/becky-schmidt-website](https://github.com/bschm0622/becky-schmidt-website)

## 🚀 Features

- **Modern Design**: Clean, responsive layout built with Tailwind CSS
- **Blog Integration**: Integrated blog section for sharing thoughts and insights using Astro's built in blog feature
- **SEO Optimized**: Comprehensive SEO implementation using astro-seo
- **Performance Focused**: Fast loading times with lazy-loaded images
- **Smooth Navigation**: Animated scrolling and intuitive navigation
- **Typewriter Effect**: Custom emoji-compatible typewriter animation on the homepage
- **Floating Navbar**: Interactive navigation with active section highlighting
- **Responsive Layout**: Mobile-first design with hamburger menu for smaller screens
- **Section Scrolling**: Smooth scrolling to sections with URL hash updates
- **Dark Mode Support**: Built-in light/dark mode theming
- **Accessible UI**: Built with shadcn/ui components for accessibility and consistency

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - For interactive UI components
- [shadcn/ui](https://ui.shadcn.com/) - Accessible and customizable component library
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

## 🧩 Components

- **Hero Section**: Featuring a typewriter effect with emoji support
- **Projects Section**: Showcasing portfolio projects with interactive cards
- **Resume Timeline**: Interactive resume with expandable sections
- **Blog Section**: Displaying latest blog posts with previews
- **Floating Navbar**: Responsive navigation with active section highlighting
- **Social Links**: Integrated social media links
- **UI Components**: Leveraging shadcn/ui for buttons and cards, with customizations

## 📂 Project Structure

```
/
├── public/             # Static assets
│   ├── images/         # Image files
│   └── opengraph-image.png  # OpenGraph image
├── src/
│   ├── components/     # UI components
│   │   ├── ui/         # Reusable UI components (shadcn/ui)
│   │   └── ...         # Page-specific components
│   ├── layouts/        # Page layouts
│   │   ├── main.astro  # Main layout for most pages
│   │   └── blog-post.astro # Blog post layout
│   ├── lib/            # Utility functions and libraries
│   │   └── emoji-typewriter.js # Custom typewriter effect
│   ├── pages/          # Page components
│   │   └── index.astro # Homepage
│   ├── content/        # Blog content (Markdown files)
│   └── styles/         # Global styles
└── astro.config.mjs    # Astro configuration
```

## 🌐 Deployment

This website is deployed on [Cloudflare Pages](https://pages.cloudflare.com/) using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):

Cloudflare Pages provides:
- Global CDN for fast loading worldwide
- Automatic HTTPS with SSL certificates
- Edge caching for improved performance
- Custom domain support with DNS management

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Astro](https://astro.build/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the components
- [astro-seo](https://github.com/jonasmerlin/astro-seo) for the SEO optimization
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations
- [Cloudflare](https://www.cloudflare.com/) for the hosting platform
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for the deployment CLI

---

<div align="center">
  <a href="https://github.com/bschm0622/becky-schmidt-website">
    View on GitHub
  </a>
</div>
