import {puzzlesAndSolutions, invalidCharsValidLength, validCharsInvalidLength, unsolvablePuzzles} from '../controllers/puzzle-strings.js';

const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // #1
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({puzzle: puzzlesAndSolutions[0][0]})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, `{"solution":"${puzzlesAndSolutions[0][1]}"}`);
                done();
            });
    });

    // #2
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Required field missing"}');
                done();
            });        
    });

    // #3
    test('Solve a puzzle with invalid characters: POST request to /api/solve', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({puzzle: invalidCharsValidLength})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Invalid characters in puzzle"}');
                done();
            }); 
    });

    // #4
    test('Solve a puzzle with incorrect length: POST request to /api/solve', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({puzzle: validCharsInvalidLength})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}');
                done();
            }); 
    });

    // #5
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({puzzle: unsolvablePuzzles[1]})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Puzzle cannot be solved"}');
                done();
            }); 
    });

    // #6
    test('Check a puzzle placement with all fields: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'D5',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"valid":true}');
                done();
            }); 
    });

    // #7
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'B2',
                value: 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"valid":false,"conflict":["region"]}');
                done();
            }); 
    });

    // #8
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'C4',
                value: 2
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"valid":false,"conflict":["row","region"]}');
                done();
            });
    });

    // #9
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'B2',
                value: 6
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"valid":false,"conflict":["row","column","region"]}');
                done();
            }); 
    });

    // #10
    test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Required field(s) missing"}');
                done();
            }); 
    });

    // #11
    test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: invalidCharsValidLength,
                coordinate: 'D5',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Invalid characters in puzzle"}');
                done();
            }); 
    });

    // #12
    test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: validCharsInvalidLength,
                coordinate: 'D5',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}');
                done();
            }); 
    });

    // #13
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'Z5',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Invalid coordinate"}');
                done();
            });      
    });

    // #14
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: puzzlesAndSolutions[0][0],
                coordinate: 'D5',
                value: 10
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"error":"Invalid value"}');
                done();
            });   
    });
});

