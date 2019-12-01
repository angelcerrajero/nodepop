'use strict';
const jimp = require ('jimp');
const path = require('path');

// Responder para  generador de thumbnails

const cote = require('cote');

// declarar el microservicio
const responder = new cote.Responder({ name: 'thumbgeneratorResponder' });

// lógica del servicio
//me suscribo al evento thumnails 
responder.on('thumbnails', (req, done) => {

    //recibo los parametros que necesito
    const imagePath = req.path;
    console.log('microservicio respuesta -> el filename es: ', req.filename);
    console.log('microservicio respuesta -> la ruta del jpg es: ', req.path);
    createThumnail(imagePath)
    //Genero el Thumnmail
        async function createThumnail(imagePath) {
        try {
            // Leo la imagen
            const image = await jimp.read(imagePath);
            console.log('image pasa por jimp');
        
            // Hago el resize de la imagen
            await image.resize(100, 100);
            console.log('hago el resize');
        
            // sobreescribo la imgagen en la ruta que necesito
            await image.writeAsync(imagePath);
            console.log('thumnail generado en: ', image);

            //devuelvo respuesta al requester
            done('Thumbnail generado');

        }catch (err) {
            console.log('Error: ', err)
        }
        
        
    }
});
