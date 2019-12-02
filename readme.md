# Entrega de practica Nodepop

## NodeJS - Express - MongoDB


## Requirements 

* MongoDB
* Cote https://github.com/dashersw/cote
* Jimp https://github.com/oliver-moran/jimp
* Node and NPM
* Git 
* JsonWebToken https://github.com/auth0/node-jsonwebtoken
* i18n (translation module) https://github.com/mashpie/i18n-node
* cross-env (use environment variables across platforms) https://github.com/kentcdodds/cross-env
* Postman installed (important to generate the token. This app is a demo so you can't login without postman)



## Configure
You have to create a .env file, that contains the same information that '.env.example' file.
You have to add this lines:

* JWT_SECRET: Secret password for generate JSON web token.



## Install

* Clone Repo with https://github.com/cerra88/nodepop
* Run `npm install` command
* Make sure MongoDB server is running, after that execute:
 `npm run insertDB` (this command import data of ads)
 `npm run insertUser` (this command import users for test JWT Auth)

* Finally execute `npm run dev` , running en dev mode, for production mode run `npm run prod`

Note: By default , server is running in port 3001

## IMPORTANT TO KNOW
For testing the API you have to generate your own Token following this steps:
* Make a /POST method using this information:
    - endpoint: http://localhost:3001/authenticate
    - user:     user@example.com
    - pass:     1234

It will generate a JSON Token that you must copy.

## Introduction

Nodepop is an APP created with Node and Express. That app has two parts, one for the API part and one for the view.

For your data, use MongoDB , where you save a list of ads with the following Schema:

`const productSchema = mongoose.Schema({
    name:   String,
    sell:   Boolean,
    price:  Number,
    photo:  String,
    tags:   Array

});`

### Description of fields

* **name**: The Product Name
* **sell**: true/false
* **price**: The product price.
* **photo**: The Product Image (you can upload directly from Postman)
* **tags**: You can select one or more of this tags: motor, work, lifestyle, mobile.


## API Methods

### Product (GET)

`http://localhost:3001/api/product`

You can filter information with the next query parameters:

#### Query parameters: 

* **name**: Filter by a product name or the beginning of the product name.
* **sell**[Boleean]: If the ad is sale or buy.
* **tags:** Filter by tags (only one of this: mobile, work, motor, lifestyle)
* **price**[Positive Integer]: It can be searched for an exact price or price range as follows:
  * value1-value2 will search products beteween the values.
  * value- Will search products with a price greater than the value.
  * -value will search products with a price less than the value.
  * value will search products with a price equal to value.
* **skip** [Positive Integer]: It's page number.
* **limit** [Positive Integer]: It's the number of products displayed per page.
* **sort**: Sort by a field, for example by price, or by name.
* **fields** You can check only the products that you put in fields

Here you 2 examples:

1- Page 0, 10 products 
`http://localhost:3001/api/product?skip=0&limit=10&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRhZTcxZjZjZWNjNzI3MDhiNDRiOWUiLCJpYXQiOjE1NzUyMzE5ODksImV4cCI6MTU3NTgzNjc4OX0.9Mv39E_Hb9EP-F5pvn31-lSngllRWoKUdW608GiRAIU`

2- Tags= motor a price between 10.000€ to 30.000€
`http://localhost:3001/api/product?tags=motor&price=10000-30000&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRhZTcxZjZjZWNjNzI3MDhiNDRiOWUiLCJpYXQiOjE1NzUyMzE5ODksImV4cCI6MTU3NTgzNjc4OX0.9Mv39E_Hb9EP-F5pvn31-lSngllRWoKUdW608GiRAIU`




### Product (POST)

`http://localhost:3001/api/product` 

user: user@example.com
password: 1234

It is highly recommended to use Postman with the following configuration:

* Authorization -> Check "Bearer Token" and paste the token that you received when you launch the POST method on `http://localhost:3001/authenticate`
* Headers -> Set "Content type" value to "application/x-www-form-urlencoded"
* Body -> Complete the next fields:
    - name(string)
    - sell(boolean)
    - price(int)
    - tags (string separated by commas if you want to add more than 1)
    - photo: important to check "file" field in Postman. After that you can upload images from your computer.






