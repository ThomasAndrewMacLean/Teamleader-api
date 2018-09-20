[![Build Status](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-api.svg?branch=master)](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-api) [![Greenkeeper badge](https://badges.greenkeeper.io/ThomasAndrewMacLean/Teamleader-api.svg)](https://greenkeeper.io/)

## Table of Contents

- [Getting started](#getting-started)
- [Tests](#tests)
- [CI](#ci)
- [Api](#api)
  - [Get](#get)
  - [Post](#post)

## Getting started

You must have node installed. Clone the repository and run `npm install` or `yarn install`.
After everything has been installed run `npm start-dev` or `yarn start-dev`. The site is now running on `http://localhost:8080/`.

This site is also live on [heroku](https://nameless-citadel-45339.herokuapp.com/).

## Tests

Test suites can be run with the command `npm test-dev` or `yarn test-dev`. Testing is done with jest. 

## CI

On every commit to github, the project is built using [travis](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-api) and all tests are run. If all goes well the new version gets deployed on [heroku](https://nameless-citadel-45339.herokuapp.com/).

## API

### GET

#### /ping
Returns status 200 and json {'message':'alive'}

#### /notifications
Returns list of webhooknotifications.  
Every time a contact is added or edited in teamleader this is logged here.

#### /getOrders
Returns list of demo orders

#### /getProducts
Returns list of demo products

#### /getCustomers
Returns list of demo customers

### POST

#### /calculateDiscount
Returns the order object with the discount and new price.
Requires an order object in the body, sent as JSON.
An order requires an array of items, and each item needs to have following properties:  
    `"product-id", "quantity", "unit-price", "total"`

example of a valid order:

```
{"order":{
  "id": "1",
  "customer-id": "1",
  "items": [
    {
      "product-id": "B102",
      "quantity": "10",
      "unit-price": "4.99",
      "total": "49.90"
    }
  ],
  "total": "49.90"
}}
```