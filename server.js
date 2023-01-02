const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  const headers ={
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'OPTIONS, POST, GET, PUT',
    'Access-Control-Max-Age':2592000, //30 days
    'Content-Type':'application/json'
  }

  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res, headers );
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getProduct(req, res, id, headers);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res, headers);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id, headers);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id, headers);
  } else {
    res.writeHead(404, headers);
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
