# Simple-MongoDB-crud
simplest form of MongoDB CRUD with node.js and express.js based in Books

Get localhost:3030/books
Get localhost:3030/books/656f95cbecfa4770def2d1d4
Post localhost:3030/books
{

    "title": "new title",
    "pages": 00,
    "year": [
      2069,
      "new text"
    ]
  }

  Delete localhost:3030/books/656f95cbecfa4770def2d1d4
  Patch localhost:3030/books/656f95cbecfa4770def2d1d4
  {
  
    "title": "update things",
    "pages": 117,
    "year": [
      2000,
      "Milidary update"
    ]
  }

**Note** : the mongo db is local. use the local uri or create one on Atlas and try 
