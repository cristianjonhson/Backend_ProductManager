class ProductManager {
  constructor() {
    this.products = [];
    this.autoIncrementId = 1;
  }

// Método para agregar un producto al arreglo
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

    // Agregar el nuevo producto al arreglo
    this.products.push(newProduct);
    console.log(`Producto agregado: ${newProduct.title}`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado');
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

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

productManager.addProduct(product1);
productManager.addProduct(product2);

console.log('Todos los productos:', productManager.getProducts());

const productIdToFind = 2;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
