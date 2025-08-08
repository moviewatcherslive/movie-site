/**
 * fetch.js
 * Simple static site generator for auto-updating entertainment site
 * - Fetches TMDB popular movies and TV shows (requires TMDB_API_KEY env)
 * - Fetches RSS feeds defined below
 * - Renders simple EJS templates into ./public
 *
 * Usage:
 *   TMDB_API_KEY=xxxx node fetch.js
 *
 * In GitHub Actions we will set TMDB_API_KEY secret and run on schedule.
 */

const fetch = require('node-fetch');
const RSSParser = require('rss-parser');
const ejs = require('ejs');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const OUT = path.join(__dirname, 'public');
mkdirp.sync(OUT);

const TMDB_API = process.env.TMDB_API_KEY;
if(!TMDB_API){
  console.warn('Warning: TMDB_API_KEY not found in env — TMDB data will be skipped.');
}

const rssFeeds = [
  'https://www.filmfare.com/rss/filmfare.xml',
  'https://variety.com/feed/',
  'https://www.hollywoodreporter.com/t/rss'
];

async function fetchTMDB(){
  if(!TMDB_API) return { movies: [], tv: [] };
  try{
    const moviesRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=en-US&page=1`);
    const moviesJson = await moviesRes.json();
    const tvRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API}&language=en-US&page=1`);
    const tvJson = await tvRes.json();
    return { movies: moviesJson.results || [], tv: tvJson.results || [] };
  }catch(err){
    console.error('TMDB fetch error', err);
    return { movies: [], tv: [] };
  }
}

async function fetchRSS(){
  const parser = new RSSParser();
  const all = [];
  for(const url of rssFeeds){
    try{
      const feed = await parser.parseURL(url);
      for(const item of feed.items.slice(0,8)){
        all.push({ source: feed.title || url, title: item.title, link: item.link, pubDate: item.pubDate });
      }
    }catch(err){
      console.warn('RSS fetch failed for', url, err.message);
    }
  }
  all.sort((a,b)=> new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
  return all.slice(0,30);
}

async function render(indexData){
  const template = fs.readFileSync(path.join(__dirname,'templates','index.ejs'),'utf8');
  const html = ejs.render(template, indexData);
  fs.writeFileSync(path.join(OUT,'index.html'), html, 'utf8');
  const staticDir = path.join(__dirname,'static');
  if(fs.existsSync(staticDir)){
    fs.readdirSync(staticDir).forEach(f=>{
      const src = path.join(staticDir,f);
      const dst = path.join(OUT,f);
      fs.copyFileSync(src, dst);
    });
  }
  console.log('Rendered public/index.html');
}

(async ()=>{
  console.log('Fetching TMDB and RSS...');
  const tmdb = await fetchTMDB();
  const rss = await fetchRSS();
  const data = { movies: tmdb.movies, tv: tmdb.tv, news: rss, generatedAt: new Date().toISOString() };
  await render(data);
})();
