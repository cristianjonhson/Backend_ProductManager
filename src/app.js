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
    const fileExists = await checkFileExists(filePath);

    if (!fileExists) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }

    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    const limit = req.query.limit;
    let result;

    if (limit) {
      result = products.slice(0, limit);
    } else {
      result = products;
    }

    if (result.length > 0) {
      res.status(200).json(result); // 200 OK: Respondiendo con productos (éxito)
    } else {
      res.status(404).json({ error: 'No se encontraron productos' }); // 404 Not Found: No se encontraron productos
    }
  } catch (error) {
    console.error('Error reading products data:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const fileExists = await checkFileExists(filePath);

    if (!fileExists) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }

    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    const productId = parseInt(req.params.id);
    const product = products.find(product => product.id === productId);

    if (product) {
      res.status(200).json(product); // 200 OK: Respondiendo con el producto (éxito)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); // 404 Not Found: Producto no encontrado
    }
  } catch (error) {
    console.error('Error reading products data:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función para verificar si un archivo existe
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});