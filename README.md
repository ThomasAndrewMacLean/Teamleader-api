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
    "product-id", "quantity", "unit-price", "total"

example of a valid order:
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