'use strict'

const mongoose = require('mongoose');

//Defino el Schema

const productSchema = mongoose.Schema({
    name:   String,
    sell:   Boolean,
    price:  Number,
    photo:  String,
    tags:   Array

});


// Uso un arrow function para evitar errores en los modelos. Hay posibilidad de perder el this, asi que siempre sin arrow funct.
productSchema.statics.list = function({filter, skip, limit, fields, sort}){
    const query = Product.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);

    return query.exec();
};



//Defino el Product y le digo que el model tiene como nombre 'Product' para que haga la relación con la colección que tengo creada en MongoDB. 
//Ojo con la pluralización, por eso esta en singular, ya que mongoose ya
const Product = mongoose.model('Product', productSchema); 

module.exports = Product;