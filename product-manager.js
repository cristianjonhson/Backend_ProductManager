class ProductManager {
    constructor() {
      this.products = [];
      this.autoIncrementId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son obligatorios');
        return;
      }
  
      // Validar código único
      if (this.products.some(product => product.code === code)) {
        console.error('El código ya existe. No se permiten códigos duplicados.');
        return;
      }
  
      const newProduct = {
        id: this.autoIncrementId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
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
  
  productManager.addProduct('Producto 1', 'Descripción 1', 20.99, 'imagen1.jpg', 'P001', 50);
  productManager.addProduct('Producto 2', 'Descripción 2', 30.49, 'imagen2.jpg', 'P002', 30);
  
  console.log('Todos los productos:', productManager.getProducts());
  
  const productIdToFind = 2;
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
  