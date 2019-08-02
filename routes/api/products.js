'use strict'

const express = require('express');
const router = express.Router();

const Product = require('./../../models/Product')


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
        filter.name = name;
    }

    if(sell){
        filter.sell = sell;
    }

    if(tags){
        filter.tags = tags;
    }


    if(typeof price !== 'undefined'){
        filter.price = price;
    }

const products = await Product.list({filter, skip, limit, fields, sort});
res.json({success: true, results: products});

} catch (err) {
    next(err);
    
}
});




router.get('/:id', async (req, res, next) =>{
    console.log('req.params', req.params);
    try {
        const _id = req.params.id;
        console.log(_id)
        const product = await Product.findById(_id).exec();
        console.log(product);

        if(!product){
            res.status(404).json({ success: false }); // Si no encuentro el ID, respondo con un 404 y hago un return para finalizar.
            return;
        }

        res.json({ success: true, result: product});


    } catch (err) {
        next(err);
    };
});


module.exports = router;