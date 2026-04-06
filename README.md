# Backend Product Manager

API simple en Node.js + Express para consultar productos desde un archivo JSON, junto con ejercicios de laboratorio orientados al manejo de usuarios y persistencia en archivos.

## Descripción del Proyecto

Este repositorio contiene:

- Un servidor Express con endpoints para listar productos y consultar un producto por ID.
- Un módulo de gestión de productos (`ProductManager`) con operaciones CRUD sobre archivos.
- Un conjunto de laboratorios en la carpeta `hands-on-Labs` para practicar manejo de usuarios con persistencia en JSON.

Es un proyecto ideal para practicar fundamentos backend: rutas HTTP, manejo de archivos con `fs/promises`, validaciones básicas y estructura modular en JavaScript.

## Tecnologías

- Node.js
- Express 4
- Nodemon (desarrollo)
- PNPM (gestor de paquetes)

## Requisitos

- Node.js 18 o superior (recomendado)
- PNPM 10 o superior

Verifica versiones instaladas:

```bash
node -v
pnpm -v
```

## Instalación

1. Clona el repositorio.
2. Entra a la carpeta del proyecto.
3. Instala dependencias con PNPM:

```bash
pnpm install
```

## Ejecución

### Modo desarrollo

```bash
pnpm dev
```

### Modo producción/local

```bash
pnpm start
```

El servidor inicia por defecto en:

```text
http://localhost:8080
```

## Scripts Disponibles

- `pnpm start`: ejecuta `src/app.js` con Node.
- `pnpm dev`: ejecuta el proyecto con Nodemon.

## Endpoints de la API

Base URL: `http://localhost:8080`

### GET /products

Devuelve todos los productos.

Ejemplo:

```bash
curl http://localhost:8080/products
```

### GET /products?limit=5

Devuelve una cantidad limitada de productos (desde el inicio del arreglo).

Ejemplo:

```bash
curl "http://localhost:8080/products?limit=5"
```

### GET /products/:id

Devuelve un producto por ID.

Ejemplo:

```bash
curl http://localhost:8080/products/2
```

## Estructura del Proyecto

```text
.
├─ src/
│  ├─ app.js                # Servidor Express y rutas /products
│  └─ product-manager.js    # Clase ProductManager (CRUD en archivo)
├─ hands-on-Labs/
│  ├─ new-user.js           # Script de ejemplo para crear/consultar usuarios
│  ├─ user-manager.js       # Clase UserManager
│  └─ Usuarios.json         # Datos de usuarios para laboratorios
├─ products.json            # Archivo de productos en la raíz del proyecto
├─ package.json
└─ README.md
```

## Configuración y Notas Importantes

- Puerto actual: `8080` (definido en `src/app.js`).
- Ubicación única de datos de productos: `products.json` en la raíz del proyecto.
- La API soporta dos formatos válidos en `products.json`: un arreglo directo `[]` o un objeto con la propiedad `products`.

Si al consultar `/products` recibes un 404 por falta de archivo, asegúrate de que exista `products.json` en la raíz del repositorio.

Contenido mínimo sugerido para `products.json`:

```json
[]
```

## Uso de PNPM

Comandos principales:

```bash
pnpm install
pnpm dev
pnpm start
```

Opcionalmente, para agregar dependencias:

```bash
pnpm add <paquete>
pnpm add -D <paquete-dev>
```

## Troubleshooting Rápido

- Error: `pnpm: command not found`
  - Instala PNPM globalmente o habilítalo con Corepack.
- Error al leer productos
  - Verifica que exista `products.json` en la raíz con JSON válido.
- Puerto en uso
  - Cambia el puerto en `src/app.js` o libera el puerto 8080.

## Próximas Mejoras Sugeridas

- Mover el puerto a variables de entorno (`.env`).
- Agregar validaciones más estrictas para `limit` e `id`.
- Incorporar tests para endpoints y gestores de archivos.
