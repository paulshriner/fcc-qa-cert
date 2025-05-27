const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // #1
    test('Create an issue with every field: POST request to /api/issues/{project}', done => {
        // get milliseconds, used for checking date was set correctly
        let date = new Date().getTime();
        
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .send({
                issue_title: "test",
                issue_text: "test",
                created_by: "test",
                assigned_to: "test",
                status_text: "test"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, "test");
                assert.equal(res.body.issue_text, "test");
                assert.approximately(new Date(res.body.created_on).getTime(), date, 1000);
                assert.approximately(new Date(res.body.updated_on).getTime(), date, 1000);
                assert.equal(res.body.created_by, "test");
                assert.equal(res.body.assigned_to, "test");
                assert.equal(res.body.open, true);
                assert.equal(res.body.status_text, "test");
                done();
            });
    });

    // #2
    test('Create an issue with only required fields: POST request to /api/issues/{project}', done => {
        let date = new Date().getTime();

        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .send({
                issue_title: "test",
                issue_text: "test",
                created_by: "test"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, "test");
                assert.equal(res.body.issue_text, "test");
                assert.approximately(new Date(res.body.created_on).getTime(), date, 1000);
                assert.approximately(new Date(res.body.updated_on).getTime(), date, 1000);
                assert.equal(res.body.created_by, "test");
                assert.equal(res.body.assigned_to, "");
                assert.equal(res.body.open, true);
                assert.equal(res.body.status_text, "");
                done();
            });        
    });

    // #3
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"required field(s) missing"}');
                done();
            });   
    });

    // #4
    test('View issues on a project: GET request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .end((err, res) => {
                // since the actual issues retrieved may not always be the same, this just checks length and parameter of the first issue
                assert.equal(res.status, 200);
                assert.notEqual(res.body.length, 0);
                assert.equal(res.body[0].assigned_to, "test");
                done();
            });      
    });

    // #5
    test('View issues on a project with one filter: GET request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest?assigned_to=test')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.notEqual(res.body.length, 0);
                assert.equal(res.body[0].assigned_to, "test");
                done();
            }); 
    });

    // #6
    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest?assigned_to=test&status_text=test&open=true')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.notEqual(res.body.length, 0);
                assert.equal(res.body[0].assigned_to, "test");
                done();
            });         
    });

    // #7
    test('Update one field on an issue: PUT request to /api/issues/{project}', done => {
        // need to make two requests, one to get an id, then one to update
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .end((err, res) => {
                chai
                    .request(server)
                    .keepOpen()
                    .put('/api/issues/apitest')
                    .send({
                        _id: res.body[0]._id,
                        status_text: "updated"
                    })
                    .end((err1, res1) => {
                        assert.equal(res.status, 200);
                        assert.equal(res1.status, 200);
                        assert.equal(res1.text, `{"result":"successfully updated","_id":"${res.body[0]._id}"}`);
                    });
                done();
            });
    });

    // #8
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .end((err, res) => {
                chai
                    .request(server)
                    .keepOpen()
                    .put('/api/issues/apitest')
                    .send({
                        _id: res.body[1]._id,
                        issue_title: "updated",
                        issue_text: "updated"
                    })
                    .end((err1, res1) => {
                        assert.equal(res.status, 200);
                        assert.equal(res1.status, 200);
                        assert.equal(res1.text, `{"result":"successfully updated","_id":"${res.body[1]._id}"}`);
                    });
                done();
            });
    });

    // #9
    test('Update an issue with missing _id: PUT request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/apitest')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"missing _id"}');
                done();
            });
    });

    // #10
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .end((err, res) => {
                chai
                    .request(server)
                    .keepOpen()
                    .put('/api/issues/apitest')
                    .send({
                        _id: res.body[0]._id
                    })
                    .end((err1, res1) => {
                        assert.equal(res.status, 200);
                        assert.equal(res1.status, 200);
                        assert.equal(res1.text, `{"error":"no update field(s) sent","_id":"${res.body[0]._id}"}`);
                    });
                done();
            });        
    });

    // #11
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/apitest')
            .send({
                _id: -1,
                issue_title: "updated"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"could not update","_id":-1}');
                done();
            });        
    });

    // #12
    test('Delete an issue: DELETE request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .end((err, res) => {
                chai
                    .request(server)
                    .keepOpen()
                    .delete('/api/issues/apitest')
                    .send({
                        _id: res.body[0]._id
                    })
                    .end((err1, res1) => {
                        assert.equal(res.status, 200);
                        assert.equal(res1.status, 200);
                        assert.equal(res1.text, `{"result":"successfully deleted","_id":"${res.body[0]._id}"}`);
                    });
                done();
            }); 
    });

    // #13
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/apitest')
            .send({
                _id: -1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"could not delete","_id":-1}');
                done();
            });          
    });

    // #14
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', done => {
        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/apitest')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"missing _id"}');
                done();
            });   
    });
});
