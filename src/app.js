const express = require('express');
const app = express();
const port = 8080;

// Rutas de ejemplo
const products = [
  { id: 1, name: 'Product 1', price: 19.99 },
  { id: 2, name: 'Product 2', price: 29.99 },
  { id: 3, name: 'Product 3', price: 39.99 },
  { id: 4, name: 'Product 4', price: 49.99 },
  { id: 5, name: 'Product 5', price: 59.99 },
  { id: 6, name: 'Product 6', price: 69.99 },
  { id: 7, name: 'Product 7', price: 79.99 },
  { id: 8, name: 'Product 8', price: 89.99 },
  { id: 9, name: 'Product 9', price: 99.99 },
  { id: 10, name: 'Product 10', price: 109.99 },
];

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todos los productos o limitar la cantidad
// Middleware para procesar la consulta y devolver los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit; // Obtén el parámetro de límite desde la consulta
  let result;

  if (limit) {
    // Si se proporciona el parámetro de límite, devuelve solo los primeros productos
    result = products.slice(0, limit);
  } else {
    // Si no se proporciona el parámetro de límite, devuelve todos los productos
    result = products;
  }

  res.json(result);
});

// Ruta para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    // Si no se encuentra el producto, devuelve un objeto de error
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
