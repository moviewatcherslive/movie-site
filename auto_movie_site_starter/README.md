Auto-updating Entertainment Site Starter
=======================================

What this is:
- A minimal static-site generator that fetches TMDB popular movies & TV shows (if you provide TMDB_API_KEY)
  and several RSS feeds (pre-configured) and renders a simple static site into ./public.
- Includes a GitHub Actions workflow that runs on schedule and publishes ./public to gh-pages branch using actions-gh-pages.
- This lets you host the site for FREE using GitHub Pages.

How to use (free hosting via GitHub Pages):
1. Create a new GitHub repository and push this project to it.
2. In repository Settings -> Pages, set Source to `gh-pages` branch (the workflow will create it on first run).
3. In GitHub, go to Settings -> Secrets and set a new secret `TMDB_API_KEY` with your TMDB API key (get it from https://www.themoviedb.org/settings/api).
   - If you do not set TMDB_API_KEY, the site will still publish RSS-based news only.
4. After pushing, go to Actions tab and run the `Build and Publish Site` workflow manually (or wait for the schedule).
5. After workflow completes, your site will be available at https://<yourusername>.github.io/<repo-name>/

Notes & customization:
- To add more RSS feeds: edit fetch.js -> rssFeeds array.
- Customize templates in templates/index.ejs.
- For AdSense, add more unique content and summaries to avoid duplicate-content issues.
- Respect copyrights: link back to original sources, avoid copying full articles.

Legal note:
- Do not republish full copyrighted articles without permission. This site links to original sources and shows small excerpts.
