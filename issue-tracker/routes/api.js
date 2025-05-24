'use strict';

const mongoose = require('mongoose');

// Schema for an issue
const issueSchema = new mongoose.Schema({
  issueTitle: {
    type: String,
    required: true
  },
  issueText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  },
  updatedOn: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  assignedTo: String,
  openStatus: {
    type: Boolean,
    required: true
  },
  statusText: String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    // Submit issue route
    .post((req, res) => {
      // get current date, this is used for created/updated on
      const curDate = new Date();

      // if required fields aren't there they will throw an error, optional fields are set as blank
      Issue.insertOne({
        "issueTitle": req.body.issue_title,
        "issueText": req.body.issue_text,
        "createdOn": curDate,
        "updatedOn": curDate,
        "createdBy": req.body.created_by,
        "assignedTo": req.body.assigned_to == undefined ? "" : req.body.assigned_to,
        "openStatus": true,
        "statusText": req.body.status_text == undefined ? "" : req.body.status_text
      })
      .then(u => {
        res.json({
          "_id": u._id,
          "issue_title": u.issueTitle,
          "issue_text": u.issueText,
          "created_on": u.createdOn,
          "updated_on": u.updatedOn,
          "created_by": u.createdBy,
          "assigned_to": u.assignedTo,
          "open": u.openStatus,
          "status_text": u.statusText
        });
      })
      .catch(err => {
        res.json({"error": "required field(s) missing"});
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
