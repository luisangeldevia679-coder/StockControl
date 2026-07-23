const app = require('../src/app');
const { PORT } = require('./enviroment');

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
