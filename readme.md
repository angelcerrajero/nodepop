# Entrega de practica Nodepop

## NodeJS - Express - MongoDB

#### *REQUIREMENTS*

*El servidor esta modificado para que arranque en el puerto 3001 ya que el 3000 lo estoy usando para seguir las clases diariamente.

*MongoDB (To start a local server you can use ./bin/mongod --dbpath ./data/db --directoryperdb)


#### *MUST READ*

Tengo 2 modulos para la gestión de la BBDD dentro de nodepop/.lib
1- Fichero connectMongoose.js: Este es encargado de gestionar la conexión con MonboDB.

2- Fichero insertDB.js que se encarga de: 
    1º. Eliminar mediante una promesa todo lo que tengo en la BBDD "products"
    2º. Insertar todos los productos que tengo en el JSON situado en ./lib/data.json


Para ejecutar el borrado de la BBDD e insertar la que esta en el JSON, simplemente hay que ejecutar el siguiente comando en la consola:

npm run insertDB

Este comando funciona correctamente ya que esta declarado en el packacge-json. Simplemente ejecutar dicho comando y la BBDD se cargara correctamente.

---

Hay 2 rutas importantes:

1- http://localhost:3001/api/product/

En esta ruta se pueden filtrar la información mediante:
name
price
sell: (boolean)
tags

combinando con:
sort
skip
limit


2- http://localhost:3001/api/product/tags
Esta ruta unicamente saca los tags unicos de todos los productos.



