const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todos los productos o limitar la cantidad
// Middleware para procesar la consulta y devolver los productos
app.get('/products', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    const limit = req.query.limit;
    let result;

    if (limit) {
      result = products.slice(0, limit);
    } else {
      result = products;
    }

    res.json(result);
  } catch (error) {
    console.error('Error reading products data:', error); // log the entire error object
    res.status(500).json({ error: 'Error reading products data' });
  }
});

// Ruta para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    const productId = parseInt(req.params.id);
    const product = products.find(product => product.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error reading products data:', error.message);
    res.status(500).json({ error: 'Error reading products data' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
