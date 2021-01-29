const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/* app.use((req, res, next) => {
    res.send('Hello from express');
}); */

const soap = require('soap');
const url = 'https://mora.tk/xml/registrar.php?wsdl';

app.post('/RegistrarEmpresa', (req, res) => {

    console.log(req.body);

    var nombre = req.body.nombre;
    var ubicacion = req.body.ubicacion;
    var representante = req.body.representante;
    var correo = req.body.correo;


    const argumentosRegistro = { nombre: nombre, ubicacion: ubicacion, representante: representante, correo: correo };

    soap.createClient(url, function(err, client) {
    if (err) console.error(err);
    else {
        client.RegistrarEmpresa(argumentosRegistro, function(err, response) {
        if (err) console.error(err);
        else {
            console.log(response);
            //res.send(response);
        }
        });
    }
    });
});

app.post('/RegistrarTienda', (req, res) => {

    console.log(req.body);

    var empresa = req.body.empresa;
    var llave = req.body.llave;
    var tienda = req.body.tienda;
    var ubicacion = req.body.ubicacion;

    const argumentosRegistro = { empresa: empresa, llave: llave, tienda: tienda, ubicacion: ubicacion };

    soap.createClient(url, function(err, client) {
    if (err) console.error(err);
    else {
        client.RegistrarTienda(argumentosRegistro, function(err, response) {
        if (err) console.error(err);
        else {
            console.log(response);
            //res.send(response);
        }
        });
    }
    });
});

module.exports = app;