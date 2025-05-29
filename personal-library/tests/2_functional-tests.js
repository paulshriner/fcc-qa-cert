/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', done => {
  //   chai.request(server)
  //   .keepOpen()
  //   .get('/api/books')
  //   .end((err, res) => {
  //     assert.equal(res.status, 200);
  //     assert.isArray(res.body, 'response should be an array');
  //     assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //     assert.property(res.body[0], 'title', 'Books in array should contain title');
  //     assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //     done();
  //   });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', () =>  {
    suite('POST /api/books with title => create book object/expect book object', () => {
      test('Test POST /api/books with title', done => {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .send({title: "A new title!"})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'Response should be an object');
          assert.property(res.body, '_id', 'Response should contain book id');
          assert.property(res.body, 'title', 'Response should contain book title');
          assert.equal(res.body.title, "A new title!");
          done();
        });
      });

      test('Test POST /api/books with no title given', done => {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "missing required field title");
          done();
        });
      });
    });

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books',  done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'Response should be an array');
          assert.isObject(res.body[0], 'A book should be an object');
          assert.property(res.body[0], '_id', 'A book should contain id');
          assert.property(res.body[0], 'title', 'A book should contain title');
          assert.property(res.body[0], 'comments', 'A book should contain comments');
          assert.property(res.body[0], 'commentcount', 'A book should contain commentcount');
          done();
        });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db',  done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books/-1')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "no book exists");
          done();
        })
      });

      test('Test GET /api/books/[id] with valid id in db',  done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          chai.request(server)
          .keepOpen()
          .get(`/api/books/${res.body[0]._id}`)
          .end((err1, res1) => {
            assert.equal(res1.status, 200);
            assert.isObject(res1.body, 'A book should be an object');
            assert.property(res1.body, '_id', 'A book should contain id');
            assert.property(res1.body, 'title', 'A book should contain title');
            assert.property(res1.body, 'comments', 'A book should contain comments');
            assert.property(res1.body, 'commentcount', 'A book should contain commentcount');
          });
          done();
        });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      test('Test POST /api/books/[id] with comment', done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          chai.request(server)
          .keepOpen()
          .post(`/api/books/${res.body[0]._id}`)
          .send({comment: "A new comment!"})
          .end((err1, res1) => {
            assert.equal(res1.status, 200);
            assert.isObject(res1.body, 'A book should be an object');
            assert.property(res1.body, '_id', 'A book should contain id');
            assert.property(res1.body, 'title', 'A book should contain title');
            assert.property(res1.body, 'comments', 'A book should contain comments');
            assert.property(res1.body, 'commentcount', 'A book should contain commentcount');
            assert.isTrue(res1.body.comments.includes("A new comment!"));
          });
          done();
        });
      });

      test('Test POST /api/books/[id] without comment field', done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          chai.request(server)
          .keepOpen()
          .post(`/api/books/${res.body[0]._id}`)
          .end((err1, res1) => {
            assert.equal(res1.status, 200);
            assert.equal(res1.text, "missing required field comment");
          });
          done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', done => {
        chai.request(server)
        .keepOpen()
        .post("/api/books/-1")
        .send({comment: "A new comment!"})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "no book exists");
          done();
        });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', () => {
      test('Test DELETE /api/books/[id] with valid id in db', done => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          chai.request(server)
          .keepOpen()
          .delete(`/api/books/${res.body[0]._id}`)
          .end((err1, res1) => {
            assert.equal(res1.status, 200);
            assert.equal(res1.text, "delete successful");
          });
          done();
        });
      });

      test('Test DELETE /api/books/[id] with id not in db', done => {
        chai.request(server)
        .keepOpen()
        .delete("/api/books/-1")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "no book exists");
          done();
        });
      });
    });
  });
});
