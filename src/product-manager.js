const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.autoIncrementId = this.calculateNextId();
    this.initialize();
  }

// Inicializa la instancia de ProductManager
  async initialize() {
    try {
// Verifica si los productos ya están cargados en memoria
      if (this.products.length === 0) {
// Verifica si el archivo existe antes de intentar leerlo
        const fileExists = await this.checkFileExists();

        if (!fileExists) {
          await this.createEmptyFile();
        }

        await this.readFromFile();
      }
    } catch (error) {
      console.error(`Error al inicializar ProductManager: ${error.message}`);
    }
  }

  async createEmptyFile() {
    try {
      await fs.writeFile(this.path, '[]', 'utf-8');
    } catch (error) {
      console.error(`Error creating an empty file: ${error.message}`);
    }
  }

  async checkFileExists() {
    try {
      await fs.access(this.path);
      return true;
    } catch (error) {
      return false;
    }
  }


  // Calcula el próximo ID disponible de forma eficiente
  calculateNextId() {
    return this.products.length > 0 ? this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1 : 1;
  }

// Agrega un nuevo producto al arreglo y guarda en el archivo
  addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (!(title && description && price && thumbnail && code && stock)) {
        throw new Error('All fields are mandatory');
      }

// Validar código único
      if (this.products.some(product => product.code === code)) {
        throw new Error('Code already exists. Duplicates not allowed.');
      }

// Crear nuevo producto con un ID autoincrementable
      const newProduct = {
        id: this.autoIncrementId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

// Agregar el nuevo producto al arreglo y guardar en el archivo
      this.products.push(newProduct);
      console.log(`Producto agregado: ${newProduct.title}`);
      this.saveToFile();
    } catch (error) {
      console.error(`Error al agregar producto: ${error.message}`);
    }
  }

// Método para obtener todos los productos
  getProducts() {
    return this.products;
  }

// Método para obtener un producto por su ID
  getProductById(id) {
    return this.products.find(product => product.id === id) || null;
  }

// Actualiza un producto por su ID
  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);

    try {
      if (product) {
        if (Object.keys(updatedFields).every(field => product.hasOwnProperty(field))) {
          const updatedProduct = { ...product, ...updatedFields };
          this.products = this.products.map(p => (p.id === id ? updatedProduct : p));
          console.log(`Producto actualizado con ID ${id}`);
          this.saveToFile();
        } else {
          throw new Error('Invalid updated fields');
        }
      } else {
        throw new Error('Product not found for update');
      }
    } catch (error) {
      console.error(`Error updating product: ${error.message}`);
    }
  }

// Elimina un producto por su ID
  deleteProduct(id) {
// Busca el índice del producto con el ID especificado en el arreglo
    const productIndex = this.products.findIndex(product => product.id === id);

    try {
      if (productIndex !== -1) {

    // Si el producto con el ID existe, utiliza splice para eliminarlo del arreglo
        this.products.splice(productIndex, 1);
        // Muestra un mensaje indicando que el producto se ha eliminado con éxito
      console.log(`Producto eliminado con ID ${id}`);
// Guarda la lista de productos actualizada en el archivo
        this.saveToFile();
      } else {
        throw new Error('Product not found for deletion');
      }
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
    }
  }

// Lee el archivo y retorna los productos
  async readFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
    } catch (error) {
      console.error(`Error reading from file: ${error.message}`);
    }
  }

// Guarda la lista de productos en el archivo
  async saveToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar en el archivo:', error.message);
    }
  }
}

// Ejemplo de uso
(async () => {
// Crear instancia de ProductManager y cargar datos desde el archivo
  const productManager = new ProductManager('src/productos.json');

// Ejemplo de productos
  const product1 = {
    title: 'Producto 1',
    description: 'Descripción 1',
    price: 20.99,
    thumbnail: 'imagen1.jpg',
    code: 'P001',
    stock: 50,
  };

  const product2 = {
    title: 'Producto 2',
    description: 'Descripción 2',
    price: 30.49,
    thumbnail: 'imagen2.jpg',
    code: 'P002',
    stock: 30,
  };

// Agregar productos, actualizar y eliminar
  productManager.addProduct(product1);
  productManager.addProduct(product2);

  console.log(productManager.getProducts());
})();
