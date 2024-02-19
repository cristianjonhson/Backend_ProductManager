# Product Manager

Este proyecto implementa una clase en JavaScript llamada "ProductManager" que gestiona un conjunto de productos.

## Funcionalidades

- Agregar productos con campos obligatorios como título, descripción, precio, ruta de imagen, código y stock.
- Validación para asegurar que el código de producto sea único.
- Asignación de un ID autoincrementable a cada producto agregado.
- Obtener la lista completa de productos.
- Buscar un producto por su ID.
- Actualizar un producto por su ID.
- Eliminar un producto por su ID.

## Uso con Express

Este proyecto ahora incluye una implementación básica de un servidor Express para interactuar con la clase `ProductManager`.

1. Instalar Node.js en tu sistema si aún no lo tienes instalado.

2. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

3. Navegar al directorio del proyecto:

   ```bash
   cd product-manager
   ```

4. Instalar las dependencias:

   ```bash
   npm install
   ```

5. Ejecutar el servidor con Nodemon (para reiniciar automáticamente cuando se realicen cambios):

   ```bash
   npm run dev
   ```

6. Acceder a través de tu navegador a las siguientes URLs:

   - [http://localhost:8080/products](http://localhost:8080/products) - Obtener todos los productos.
   - [http://localhost:8080/products?limit=5](http://localhost:8080/products?limit=5) - Obtener los primeros 5 productos.
   - [http://localhost:8080/products/2](http://localhost:8080/products/2) - Obtener el producto con ID=2.
   - [http://localhost:8080/products/34123123](http://localhost:8080/products/34123123) - Obtener un error indicando que el producto no existe.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias, por favor crea un "issue" en este repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.