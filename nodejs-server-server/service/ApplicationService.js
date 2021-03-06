'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb+srv://admin:admin@cluster0.pilql.mongodb.net/greenhero?retryWrites=true&w=majority";
var Character = require('../service/CharacterService');

/**
 * Create a new Application
 *
 * body Application To create a new application
 * no response value expected for this operation
 **/
exports.createApplication = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Application").insertOne({
        "team_id": ObjectId(body.team_id),
        "user_id": ObjectId(body.user_id),
        "character": ObjectId(body.character),
        "accepted": body.accepted,
        "rejected": body.rejected
      }, function (err, result) {
        if (err) throw err;

        dbo.collection("Team").updateOne({_id: new ObjectId(body.team_id)}, {
          $push: { applications: new ObjectId(result.insertedId) } 
        }).then((resultUpdate) => {
          resolve(result);
          db.close();
        });
      });
    });
  });
}


/**
 * Delete Application
 * To delete an application
 *
 * team_id String team_id  of application
 * user_id String team_id  of application
 * no response value expected for this operation
 **/
exports.deleteApplicationByTeamIdAndUserId = function (team_id, user_id) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Application").deleteOne({
        "team_id": ObjectId(team_id),
        "user_id": ObjectId(user_id)
      }, function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
  });
}


/**
 * Get Applications by team ID
 * See the available applications by team ID
 *
 * team_id String team_id  of application
 * returns List
 **/
exports.getAllApplicationsByTeamId = function (team_id) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Application").find({
        "team_id": ObjectId(team_id)
      }).toArray(async function (err, result) {
        if (err) throw err;
        for(let app of result) {
          if(app.character) {
            app.character = await Character.getCharacterById(app.character);
          }
        }
        resolve(result);
        db.close();
      });
    });
  });
}

    var examples = {};
    examples['application/json'] = [{
      "character": "character",
      "user_id": "user_id",
      "rejected": true,
      "accepted": true,
      "_id": "_id",
      "team_id": "team_id"
    }, {
      "character": "character",
      "user_id": "user_id",
      "rejected": true,
      "accepted": true,
      "_id": "_id",
      "team_id": "team_id"
    }];
/**
 * Get Application by ID
 * See the application by ID
 *
 * _id String _id of application
 * returns Application
 **/
exports.getApplicationById = function (_id) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Application").findOne({
        "_id": ObjectId(_id)
      }).then(async function (result) {
        if (err) throw err;
        if(result.character) {
          result.character = await Character.getCharacterById(result.character);
        }
        resolve(result);
        db.close();
      });
    });
  });
}


/**
 * Modify Application
 * To modify a Application
 *
 * body Application Updated Application object
 * no response value expected for this operation
 **/
exports.modifyApplication = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Application").updateOne({
        "_id": ObjectId(body._id),
      },
        {
          $set: {
            "team_id": ObjectId(body.team_id),
            "user_id": ObjectId(body.user_id),
            "character": ObjectId(body.character),
            "accepted": body.accepted,
            "rejected": body.rejected
          }
        }, function (err, result) {
          if (err) throw err;
          resolve(result);
          db.close();
        });
    });
  });
}


