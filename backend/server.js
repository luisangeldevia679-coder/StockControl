const app = require('./src/app');
const { PORT } = require('./src/config/enviroment');

app.listen(PORT, () => {
  console.log(`¡Servidor corriendo en el puerto ${PORT}!`);
});