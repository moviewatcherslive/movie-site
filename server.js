const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Demo data (would be replaced by TMDB calls later)
const demo = {
  bollywood: [
    { title: "Bollywood Hit 1", poster: "/images/bollywood1.jpg", trailer: "https://www.youtube.com/embed/ysz5S6PUM-U" },
    { title: "Bollywood Hit 2", poster: "/images/bollywood2.jpg", trailer: "https://www.youtube.com/embed/ScMzIvxBSi4" }
  ],
  hollywood: [
    { title: "Hollywood Blockbuster 1", poster: "/images/hollywood1.jpg", trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
    { title: "Hollywood Blockbuster 2", poster: "/images/hollywood2.jpg", trailer: "https://www.youtube.com/embed/2Vv-BfVoq4g" }
  ],
  ott: [
    { title: "OTT Series 1", poster: "/images/ott1.jpg", trailer: "https://www.youtube.com/embed/3fumBcKC6RE" },
    { title: "OTT Series 2", poster: "/images/ott2.jpg", trailer: "https://www.youtube.com/embed/l9PxOanFjxQ" }
  ]
};

app.get('/', (req, res) => {
  res.render('index', { demo });
});

app.listen(PORT, ()=> console.log('Server running on port', PORT));
