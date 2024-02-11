const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    
    // Ruta del archivo JSON donde se almacenarán los productos
    this.path = filePath;
    // Arreglo para almacenar los productos en memoria
    this.products = [];
    // Contador para generar IDs autoincrementables
    this.autoIncrementId = 1;
  }

  // Método para inicializar la clase, cargar productos desde el archivo
  async initialize() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
      
      // Calcular el siguiente ID disponible
      this.autoIncrementId = this.calculateNextId();
    } catch (error) {
      // Si hay un error al leer el archivo, tratarlo como si el archivo no existiera
      console.error('Error al inicializar ProductManager:', error.message);
      this.products = [];
    }
  }

 // Método para guardar la lista de productos en el archivo
async saveToFile() {
  try {
    
    // Utiliza fs.writeFile para escribir en el archivo
    // this.path es la ruta del archivo, this.products contiene la lista de productos
    // JSON.stringify convierte la lista de productos a una cadena JSON con formato legible (null, 2)
    // 'utf-8' especifica la codificación del archivo
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  } catch (error) {
    // Captura cualquier error que pueda ocurrir durante la escritura en el archivo
    console.error('Error al guardar en el archivo:', error.message);
  }
}


  // Método para calcular el siguiente ID disponible
  calculateNextId() {
    return this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
  }

  // Método para agregar un nuevo producto al arreglo y guardar en el archivo
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

    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado');
    }
  }

// Método para actualizar un producto por su ID
updateProduct(id, updatedFields) {
  // Busca el índice del producto con el ID especificado en el arreglo
  const productIndex = this.products.findIndex(product => product.id === id);

  if (productIndex !== -1) {
    // Si el producto con el ID existe, crea una copia actualizada del producto
    // Utiliza el spread operator (...) para combinar el producto existente con los campos actualizados
    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    // Reemplaza el producto existente en el arreglo con el producto actualizado
    this.products[productIndex] = updatedProduct;
    // Muestra un mensaje indicando que el producto se ha actualizado con éxito
    console.log(`Producto actualizado con ID ${id}`);
    // Guarda la lista de productos actualizada en el archivo
    this.saveToFile();

  } else {
    // Si no se encuentra el producto con el ID especificado, muestra un mensaje de error
    console.error('Producto no encontrado para actualizar');
  }
}

  // Método para eliminar un producto por su ID
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

}

// Ejemplo de uso
(async () => {
  // Crear instancia de ProductManager y cargar datos desde el archivo
  const productManager = new ProductManager('productos.json');
  await productManager.initialize();

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

  console.log('Todos los productos:', productManager.getProducts());

 // ID del producto que se actualizará
const productIdToUpdate = 2;
// Campos actualizados para el producto con el ID especificado
const updatedFields = { stock: 40, price: 35.99 };
// Llama al método updateProduct para actualizar el producto con el ID y los campos especificados
productManager.updateProduct(productIdToUpdate, updatedFields);

// ID del producto que se eliminará
const productIdToDelete = 1;
// Llama al método deleteProduct para eliminar el producto con el ID especificado
productManager.deleteProduct(productIdToDelete);
console.log('Productos actualizados:', productManager.getProducts());

})();