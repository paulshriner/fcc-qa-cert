/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose');

// Schema for a book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {
  app.route('/api/books')
    .get((req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post((req, res) => {
      // response will contain new book object including at least _id and title
      if (req.body.title != undefined && req.body.title != "") {
        Book.insertOne({
          "title": req.body.title
        })
        .then(b => {
          res.json({
            "_id": b._id,
            "title": b.title
          });
        })
        .catch(err => {
          res.json({"error": "could not insert book"});
        });
      } else {
        res.send("missing required field title");
      }
    })
    
    .delete((req, res) => {
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get((req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post((req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete((req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
