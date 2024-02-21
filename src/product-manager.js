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
      // Verifica si el archivo existe antes de intentar leerlo
      const fileExists = await this.checkFileExists();
      
      if (!fileExists) {
        // Si el archivo no existe, crea un archivo vacío con un array
        await fs.writeFile(this.path, '[]', 'utf-8');
      }

      // Lee los datos del archivo
      const fileData = await this.readFromFile();
      this.products = Array.isArray(fileData) ? fileData : [];
    } catch (error) {
      console.error(`Error al inicializar ProductManager: ${error.message}`);
    }
  }

  // Verifica si el archivo existe
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
// Validar campos obligatorios
    if (!(title && description && price && thumbnail && code && stock)) {
      console.error('Todos los campos son obligatorios');
      return;
    }

// Validar código único
    if (this.products.some(product => product.code === code)) {
      console.error('El código ya existe. No se permiten códigos duplicados.');
      return;
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
  }

  // Método para obtener todos los productos
  getProducts() {
    return this.products;
  }

  // Método para obtener un producto por su ID
  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    return product || null;
  }

  // Actualiza un producto por su ID
  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);

    if (product) {
      if (Object.keys(updatedFields).every(field => product.hasOwnProperty(field))) {
        const updatedProduct = { ...product, ...updatedFields };
        this.products = this.products.map(p => (p.id === id ? updatedProduct : p));
        console.log(`Producto actualizado con ID ${id}`);
        this.saveToFile();
      } else {
        console.error('Campos actualizados no válidos');
      }
    } else {
      console.error('Producto no encontrado para actualizar');
    }
  }

  // Elimina un producto por su ID
  deleteProduct(id) {
// Busca el índice del producto con el ID especificado en el arreglo
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {

    // Si el producto con el ID existe, utiliza splice para eliminarlo del arreglo
      this.products.splice(productIndex, 1);
    // Muestra un mensaje indicando que el producto se ha eliminado con éxito
      console.log(`Producto eliminado con ID ${id}`);
    // Guarda la lista de productos actualizada en el archivo
      this.saveToFile();
    } else {
    // Si no se encuentra el producto con el ID especificado, muestra un mensaje de error
      console.error('Producto no encontrado para eliminar');
    }
  }

  // Lee el archivo y retorna los productos
  async readFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      console.error(`Error al leer desde el archivo: ${error.message}`);
      return [];
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

})();

module.exports = ProductManager;
