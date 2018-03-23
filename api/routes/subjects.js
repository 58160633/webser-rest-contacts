const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Subject = require("../models/subject");

router.get("/", (req, res, next) => {
    Subject.find()
      .exec()
      .then(docs => {
        console.log(docs);
        //   if (docs.length >= 0) {
        res.status(200).json(docs);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.post("/", (req, res, next) => {
    const subject = new Subject({
      _id: new mongoose.Types.ObjectId(),
      subjectId: req.body.subjectId,
      name: req.body.name,
      credit: req.body.credit
    });
    subject
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Subject creat successful",
          createdSubject: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Subject.findById(id)
//    Subject.find({subjectId: id})
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Subject.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Subject updated successful",
            updatedSubject: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Subject.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: "Subject deleted successful",
            deletedSubject: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;