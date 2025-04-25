# Documentación del Frontend - Procesador OCR de Recibos
![alt text](<Captura desde 2025-04-24 22-52-32.png>)

## Descripción del Frontend

El frontend de la aplicación OCR de recibos consta de un componente principal (App.tsx) que permite a los usuarios subir imágenes de recibos y procesarlas para extraer texto.

### Funcionalidades Principales:
- Selección de archivos de imagen
- Vista previa de la imagen seleccionada
- Botón para eliminar la imagen cargada
- Procesamiento OCR mediante conexión a API externa
- Visualización del texto extraído del recibo

### Interfaz de Usuario:
- Formulario para cargar imágenes
- Área de vista previa con botón para eliminar
- Sección para mostrar el texto extraído
- Mensajes informativos y de error
- Diseño responsivo que se adapta a distintos dispositivos

## Guía de Instalación en Local

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)
- Un editor de código como Visual Studio Code

### Pasos para Instalación

1. **Clonar o crear el proyecto**
   ```bash
   # Si estás creando un nuevo proyecto
   npx create-react-app ocr-receipts --template typescript
   
   # O si ya tienes la carpeta con el código
   cd ruta/a/tu/carpeta
   ```

2. **Crear o reemplazar los archivos principales**
   - Crea o reemplaza `src/App.tsx` con el componente principal
   - Crea o reemplaza `src/App.css` con los estilos CSS
   - Asegúrate de tener los archivos `src/index.tsx` e `index.css` configurados

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Configurar la URL de la API**
   - Abre el archivo `App.tsx`
   - Busca la línea con la URL de la API y modifícala para que apunte a tu backend:
     ```typescript
     // Cambia esta línea según tu entorno
     const response = await fetch('http://localhost:5000/upload-ocr', {
     ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```
   Esto abrirá automáticamente la aplicación en tu navegador, generalmente en `http://localhost:3000`

6. **Probar la aplicación**
   - Selecciona una imagen de recibo
   - Haz clic en "Procesar con OCR"
   - Verifica que se muestre el texto extraído

## Preparación para Producción

1. **Crear versión de producción**
   ```bash
   npm run build
   ```
   Esto generará una carpeta `build` con archivos optimizados para producción

2. **Probar la versión de producción localmente (opcional)**
   ```bash
   # Instalar serve globalmente
   npm install -g serve
   
   # Servir la carpeta build
   serve -s build
   ```
   Esto te permitirá verificar la versión de producción antes de desplegarla

## Despliegue con Cloudflare Pages

1. **Subir la carpeta build a Cloudflare Pages**:
   - Inicia sesión en tu cuenta de Cloudflare
   - Ve a la sección "Pages"
   - Haz clic en "Crear un proyecto"
   - Sube directamente la carpeta `build` generada
   - Selecciona la carpeta `build` como directorio raíz para el sitio
   - Haz clic en "Guardar e implementar"

La aplicación quedará desplegada y accesible a través de la URL proporcionada por Cloudflare Pages, con todas las ventajas de su CDN global para una carga rápida desde cualquier ubicación.