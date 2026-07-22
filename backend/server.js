// 1. Importamos la 'app' desde tu archivo principal en la carpeta src
// (Nota: Si tu archivo dentro de src se llama index.js, cambia './src/app' por './src/index')
const app = require('./src/app'); 

// 2. Ahora sí, le decimos a esa 'app' que encienda el servidor
app.listen(3000, () => {
    console.log("¡Servidor corriendo en el puerto 3000!");
});