const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS सेटअप
app.set('view engine', 'ejs');
app.set('views', __dirname);

// Static फाइल्स के लिए फोल्डर
app.use(express.static(path.join(__dirname, 'public')));

// होम पेज रेंडर करना
app.get('/', (req, res) => {
  res.render('index');
});

// सर्वर स्टार्ट
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
