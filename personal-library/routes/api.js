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
      Book.find()
      .then(b => {
        let books = [];

        // copies book object then adds comment length
        // thanks https://www.geeksforgeeks.org/javascript-how-to-add-an-element-to-a-json-object/ for spread operator to copy JSON object
        for (const book in b) {
          books[book] = {...b[book]["_doc"], commentcount: b[book].comments.length};
        }

        res.json(books);
      })
      .catch(err => {
        res.json({"error": "No books found!"});
      });
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
    
    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
      // thanks https://www.slingacademy.com/article/mongoose-how-to-remove-all-documents-from-a-collection/ for deleteMany syntax
      await Book.deleteMany({})
      .then(i => {
        res.send(i.deletedCount > 0 ? "complete delete successful" : "no book exists");
      })
      .catch(err => {
        res.send("no book exists");
      })
    });

  app.route('/api/books/:id')
    .get((req, res) => {
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findOne({"_id": req.params.id})
      .then(b => {
        if (b != null) {
          res.json({...b["_doc"], commentcount: b.comments.length});
        } else {
          res.send("no book exists");
        }
      })
      .catch(err => {
        res.send("no book exists");
      });
    })
    
    .post((req, res) => {
      // thanks https://www.slingacademy.com/article/mongoose-how-to-update-values-in-an-array-of-objects/ for findOneAndUpdate syntax
      if (req.body.comment != undefined && req.body.comment != "") {
        Book.findByIdAndUpdate(req.params.id, {'$push': {comments: req.body.comment}})
        .then(b => {
          if (b != null) {
            // since response should be the same as GET, this just redirects to that page to reduce duplicate code
            res.redirect(`/api/books/${req.params.id}`);
          } else {
            res.send("no book exists");
          }
        })
        .catch(err => {
          res.send("no book exists");
        });
      } else {
        res.send("missing required field comment");
      }
    })
    
    .delete((req, res) => {
      //if successful response will be 'delete successful'
      Book.deleteOne({"_id": req.params.id})
      .then(i => {
        res.send(i.deletedCount > 0 ? "delete successful" : "no book exists");
      })
      .catch(err => {
        res.send("no book exists");
      });
    });
};
