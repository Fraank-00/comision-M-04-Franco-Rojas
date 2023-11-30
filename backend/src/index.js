require('dotenv').config();

const app = require('./app');


const  conectarMongo =  require('./database');

async function main(){
    await app.listen(app.get('puerto'));
    console.log('Servidor corriendo en el puerto 3000');
    conectarMongo()
}
main();