const createdProduct = {
  "name": "One Plus 13",
  "description": "13 max is new product",
  "manufactureDate": "2023-12-10T18:30:00.000Z",
  "price": 12999,
  "quantity": 10,
  "isDelete": 0,
  "_id": "657869a210fd2d2126495152",
  "createdAt": "2023-12-12T14:09:38.047Z",
  "updatedAt": "2023-12-12T14:09:38.047Z",
  "__v": 0
}

const mockProductsData = [
  {
    "_id": "657869a210fd2d2126495152",
    "name": "One Plus 13",
    "description": "13 max is new product",
    "manufactureDate": "2023-12-10T18:30:00.000Z",
    "price": 12999,
    "quantity": 10,
    "isDelete": 0,
    "createdAt": "2023-12-12T14:09:38.047Z",
    "updatedAt": "2023-12-12T14:09:38.047Z",
    "__v": 0
  }
]

const mockProductData = {
  "_id": "657869a210fd2d2126495152",
  "name": "One Plus 13",
  "description": "13 max is new product",
  "manufactureDate": "2023-12-10T18:30:00.000Z",
  "price": 12999,
  "quantity": 10,
  "isDelete": 0,
  "createdAt": "2023-12-12T14:09:38.047Z",
  "updatedAt": "2023-12-12T14:09:38.047Z",
  "__v": 0
}

const mockUpdateProductPayload = {
  "name": "One Plus 13",
  "description": "13 max is new product",
  "quantity": 10,
  "price": 12999,
}

const mockDelectedProductData = {
  "_id": "657869a210fd2d2126495152",
  "name": "One Plus 13",
  "description": "13 max is new product",
  "manufactureDate": "2023-12-10T18:30:00.000Z",
  "price": 12999,
  "quantity": 10,
  "isDelete": 1,
  "createdAt": "2023-12-12T14:09:38.047Z",
  "updatedAt": "2023-12-12T14:09:38.047Z",
  "__v": 0
}

const mockOrderData = {
  "_id": "6579a4d94c1d3abfca1efaf7",
  "billingAddress": {
    "fullName": "Jane Doe",
    "email": "janedoe@email.com",
    "street": "123 Main Street",
    "city": "Austin",
    "state": "Texas",
    "zip": "78751",
    "country": "United States"
  },
  "productsDetail": [
    {
      "productId": "657869a210fd2d2126495152",
      "productName": "dgdfgdsfgdsfgsdfgdf",
      "quantity": 3,
      "amount": "12999",
      "_id": "6579a4d94c1d3abfca1efaf8"
    }
  ],
  "totolAmount": 38997,
  "isDelete": 0,
  "orderDate": "2023-12-13T12:34:33.593Z",
  "createdAt": "2023-12-13T12:34:33.597Z",
  "updatedAt": "2023-12-13T12:34:33.597Z",
  "__v": 0
}

const mockUpdateOrderPayload = {
  "billingAddress": {
    "fullName": "Jane Doe",
    "email": "janedoe@email.com",
    "street": "123 Main Street",
    "city": "Austin",
    "state": "Texas",
    "zip": "78751",
    "country": "United States",
  },
}

module.exports = {
  createdProduct,
  mockProductsData,
  mockProductData,
  mockUpdateProductPayload,
  mockDelectedProductData,
  mockOrderData,
  mockUpdateOrderPayload,
};