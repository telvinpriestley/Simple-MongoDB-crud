// init
const express = require('express');
const app = express();
// connect to database Option One
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
// connect to database Option two
// const db= require('./db')

// database connection listen condition 
let db;
PORT = 3030;
connectToDb((err) => {
    if (!err) {

        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        });
        db = getDb();
    };
});


//middle ware to pass json data via body
app.use(express.json());

// end points 
// get/fetch entire collection of books 
app.get('/books', (req, res) => {
    try {
        // querry parameter for pages and books per page = 2
        const pages = req.query.page || 0;
        const pageBooks = 3;
        let books = [];

        db.collection('books')
            .find()
            .skip(pages * pageBooks)
            .limit(pageBooks)
            .forEach(book => books.push(book))
            .then(() => {
                res.json(books);
            })
    } catch (error) {
        console.log(error);
    }

})

// fetch single book/document by Id
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {

        db.collection('books')
            .findOne({ _id: new ObjectId(id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ err: 'could not get the book' });
            });
    } else {
        res.status(500).json({ err: 'not a valid doc id' });
    };

});

// post/creat now book/document 
app.post('/books', (req, res) => {
    const Book = req.body;
    db.collection('books')
        .insertOne(Book)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ err: 'could not insert the book' });
        });
});

//Delete single document by Id
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {

        db.collection('books')
            .deleteOne({ _id: new ObjectId(id) })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ err: 'could not delete the book' });
            });
    } else {
        res.status(500).json({ err: 'not a valid book id' });
    }

});

// update single Doc by Id
app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    const id = req.params.id;
    if (ObjectId.isValid(id)) {

        db.collection('books')
            .updateOne({ _id: new ObjectId(id) }, {$set: updates})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ err: 'could not update the book' });
            });
    } else {
        res.status(500).json({ err: 'not a valid book id' });
    };

});

//simple CRUD with mongoDB