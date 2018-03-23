const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Contacts = require("../models/contacts");

router.get("/", (req, res, next) => {
    Contacts.find()
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
    const contacts = new Contacts({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      address: req.body.address,
      Phone: req.body.Phone,
      mobile: req.body.mobile
    });
    contacts
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Contacts creat successful",
          createdContacts: result
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
    Contacts.findById(id)
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
    Contacts.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Contacts updated successful",
            updatedContacts: result
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
    Contacts.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: "Contacts deleted successful",
            deletedContacts: result
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
