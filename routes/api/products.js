'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('./../../models/Product')
const cote = require('cote');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'products'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage });

router.get('/', async (req, res, next) =>{
try {
    //Utilizamos el .query ya que son parametros marcados en la url despues de URL?parametros
    const name = req.query.name;
    const sell = req.query.sell;
    const price = req.query.price;
    const tags = req.query.tags;
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;

    const filter = {};

    if(name){
        filter.name = new RegExp('^' + req.query.name, "i"); //El "i" es para que sea insensible a mayusculas/minusculas
    }

    if(sell){
        filter.sell = sell;
    }

    if(tags){
        filter.tags = tags;
    }


    if(typeof price !== 'undefined'){
        const priceToFilter = price.split("-");
        
        if(priceToFilter.length === 1){
            filter.price = price
            
        }else if (priceToFilter.length === 2){
            const campo1 = parseInt(priceToFilter[0]);
            const campo2 = parseInt(priceToFilter[1]);
            
            if(campo1 >= 0 && campo2 >= 0){
                filter.price = {'$gte': campo1, '$lte': campo2 };
            }else if(campo1 >= 0){
                filter.price = {'$gte': campo1 };
            }else if(campo2 >= 0){
                filter.price = {'$lte': campo2 };
            }
        }

    }

const products = await Product.list({filter, skip, limit, fields, sort});

res.render('index', {products});

} catch (err) {
    next(err);
    
}
});






router.post('/', upload.single('photo'), async (req, res, next) =>{
    try {
        const data = req.body;
        const file = req.file;
        const product = new Product(data);
        const newProduct = await product.save();
        res.json({success: true, result: newProduct});
        // Requester para generador de thumbnails
        const requester = new cote.Requester({ name: 'thumbgenerator client' });
        requester.send({
            type: 'thumbnails',
            file: file,
            filename: file.originalname,
            path: file.path,
        }, response => {
            console.log(`responde el cliente --> ${response}`);
          })

        
    } catch (err) {
        next(err);
    }


});



router.get('/tags', async (req, res, next) =>{
    
    try {
        
        const resultado = await Product.distinct('tags');
        res.json({success: true, result: resultado});


    } catch (err) {
        next(err)
    }
});

module.exports = router;