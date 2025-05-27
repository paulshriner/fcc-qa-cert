'use strict';

const mongoose = require('mongoose');

// Schema for an issue
const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    required: true
  },
  updated_on: {
    type: Date,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: String,
  open: {
    type: Boolean,
    required: true
  },
  status_text: String,
  project: {
    type: String,
    required: true
  }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {
  app.route('/api/issues/:project')
    // Route for getting list of issues, either all issues or based on params
    .get((req, res) => {
      Issue.find()
      .then(i => {
        let issues = [];

        for (const issue in i) {
          // Only show issues for given project
          if (i[issue].project != req.params.project) continue;

          // Handles _id url param
          if (req.query._id != undefined && i[issue]._id != req.query._id) continue;

          // Handles issue_title url param
          if (req.query.issue_title != undefined && i[issue].issue_title != req.query.issue_title) continue;

          // Handles issue_text url param
          if (req.query.issue_text != undefined && i[issue].issue_text != req.query.issue_text) continue;

          // Handles created_on url param
          if (req.query.created_on != undefined && i[issue].created_on != req.query.created_on) continue;

          // Handles updated_on url param
          if (req.query.updated_on != undefined && i[issue].updated_on != req.query.updated_on) continue;

          // Handles created_by url param
          if (req.query.created_by != undefined && i[issue].created_by != req.query.created_by) continue;

          // Handles assigned_to url param
          if (req.query.assigned_to != undefined && i[issue].assigned_to != req.query.assigned_to) continue;

          // Handles open url param
          if (req.query.open != undefined && i[issue].open.toString() != req.query.open) continue;

          // Handles status_text param
          if (req.query.status_text != undefined && i[issue].status_text != req.query.status_text) continue;

          issues.push({
            "assigned_to": i[issue].assigned_to,
            "status_text": i[issue].status_text,
            "open": i[issue].open,
            "_id": i[issue]._id,
            "issue_title": i[issue].issue_title,
            "issue_text": i[issue].issue_text,
            "created_by": i[issue].created_by,
            "created_on": i[issue].created_on,
            "updated_on": i[issue].updated_on
          });
        }

        res.json(issues);
      })
      .catch(err => {
        res.json({"error": "No issues found!"});
      });
    })

    // Submit issue route
    .post((req, res) => {
      // get current date, this is used for created/updated on
      const curDate = new Date();

      // if required fields aren't there they will throw an error, optional fields are set as blank
      Issue.insertOne({
        "issue_title": req.body.issue_title,
        "issue_text": req.body.issue_text,
        "created_on": curDate,
        "updated_on": curDate,
        "created_by": req.body.created_by,
        "assigned_to": req.body.assigned_to == undefined ? "" : req.body.assigned_to,
        "open": true,
        "status_text": req.body.status_text == undefined ? "" : req.body.status_text,
        "project": req.params.project
      })
      .then(u => {
        res.json({
          "_id": u._id,
          "issue_title": u.issue_title,
          "issue_text": u.issue_text,
          "created_on": u.created_on,
          "updated_on": u.updated_on,
          "created_by": u.created_by,
          "assigned_to": u.assigned_to,
          "open": u.open,
          "status_text": u.status_text
        });
      })
      .catch(err => {
        res.json({"error": "required field(s) missing"});
      });
    })

    .put(async (req, res) => {
      // check for id, as this is required to know which issue to update
      if (req.body._id != undefined && req.body._id != "") {
        // check fields to see if there is anything to update
        let changed = {};
        for (const field in req.body) {
          if (field != '_id') {
            if ((field == 'open' && req.body[field]) || (req.body[field] != undefined && req.body[field] != "")) {
              changed[field] = req.body[field];
            }
          }
        }

        if (Object.keys(changed).length > 0) {
          // here, there is at least one thing to change, so get current date to set updated_on
          changed["updated_on"] = new Date();
          // thanks https://mongoosejs.com/docs/api/model.html#Model.updateOne() for reference on updateOne() method
          await Issue.updateOne({"_id": req.body._id}, changed)
                     .then(i => {
                       // if nothing was matched then the id was not found
                       if (i.matchedCount > 0) {
                         res.json({"result": "successfully updated", "_id": req.body._id});
                       } else {
                         res.json({"error": "could not update", "_id": req.body._id});
                       }
                     })
                     .catch(err => {
                       res.json({"error": "could not update", "_id": req.body._id});
                     });
        } else {
          res.json({"error": "no update field(s) sent", "_id": req.body._id});
        }
      } else {
        res.json({"error": "missing _id"});
      }
    })

    .delete((req, res) => {
      // check for id, as this is required to know which issue to delete
      if (req.body._id != undefined && req.body._id != "") {
        Issue.deleteOne({"_id": req.body._id})
             .then(i => {
               // if nothing was matched then the id was not found
               if (i.deletedCount > 0) {
                 res.json({"result": "successfully deleted", "_id": req.body._id});
               } else {
                 res.json({"error": "could not delete", "_id": req.body._id});
               }
             })
             .catch(err => {
               res.json({"error": "could not delete", "_id": req.body._id});
             });
      } else {
        res.json({"error": "missing _id"});
      }
    });
};
