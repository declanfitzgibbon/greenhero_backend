'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";


/**
 * Create new Consumption
 *
 * body Consumption To create new consumption
 * no response value expected for this operation
 **/
exports.createConsumption = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").insertOne({
        "user_id": ObjectId(body.user_id),
        "date": body.date,
        "total": body.total,
        "category": body.category
      }, function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
  });
}


/**
 * Delete Consumption by user id,date and category
 * To delete a user's consumption by user id,date and category
 *
 * user_id String The user id of the consumption that needs to be deleted
 * date date date of consumption
 * category String category  of consumption
 * no response value expected for this operation
 **/
exports.deleteConsumptionByUserIdDateAndCategory = function (user_id, date, category) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").deleteOne({
        "user_id": ObjectId(user_id),
        "date": date,
        "category": category
      }, function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
  });
}


/**
 * Delete Consumption
 * To delete a user's consumption of a date
 *
 * user_id String The user id of the consumption that needs to be deleted
 * date date date of consumption
 * no response value expected for this operation
 **/
exports.deleteConsumptionByUserIdandDate = function (user_id, date) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").deleteOne({
        "user_id": ObjectId(user_id),
        "date": date
      }, function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
  });
}


/**
 * Find consumption by user id,date and category
 *
 * user_id String user id of consumption to return
 * date date date of consumption to return
 * category String category  of consumption to return
 * returns Consumption
 **/
exports.getConsumptionByUserIdDateAndCategory = function (user_id, date, category) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").find({
        "user_id": ObjectId(user_id),
        "date": date,
        "category": category
      }).toArray(function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
    var examples = {};
    examples['application/json'] = {
      "date": "2000-01-23",
      "total": 0.80082819046101150206595775671303272247314453125,
      "user_id": "user_id",
      "_id": "_id",
      "category": "category"
    };
  });
}


/**
 * Find consumption by user id and date
 *
 * user_id String user id of consumption to return
 * date date date of consumption to return
 * returns List
 **/
exports.getConsumptionByUserIdandDate = function (user_id, date) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").find({
        "user_id": ObjectId(user_id),
        "date": date
      }).toArray(function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
    var examples = {};
    examples['application/json'] = [{
      "date": "2000-01-23",
      "total": 0.80082819046101150206595775671303272247314453125,
      "user_id": "user_id",
      "_id": "_id",
      "category": "category"
    }, {
      "date": "2000-01-23",
      "total": 0.80082819046101150206595775671303272247314453125,
      "user_id": "user_id",
      "_id": "_id",
      "category": "category"
    }];
  });
}

/**
 * Find consumption by user id after a date
 *
 * user_id String user id of consumption to return
 * date date date of consumption to return
 * returns List
 **/
exports.getConsumptionForUserAfterDate = function (user_id, date) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").find({
        "user_id": ObjectId(user_id),
        "date": date
      }).toArray(function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
    var examples = {};
    examples['application/json'] = [{
      "date": "2000-01-23",
      "total": 0.80082819046101150206595775671303272247314453125,
      "user_id": "user_id",
      "_id": "_id",
      "category": "category"
    }, {
      "date": "2000-01-23",
      "total": 0.80082819046101150206595775671303272247314453125,
      "user_id": "user_id",
      "_id": "_id",
      "category": "category"
    }];
  });
}


/**
 * Modify Consumption
 * To modify a Consumption
 *
 * body Consumption modify the Consumption
 * no response value expected for this operation
 **/
exports.modifyConsumption = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("greenhero");
      dbo.collection("Consumption").updateOne({
        "_id": ObjectId(body._id),
      },
        {
          "user_id": ObjectId(body.user_id),
          "date": body.date,
          "total": body.total,
          "category": body.category
        }, function (err, result) {
          if (err) throw err;
          resolve(result);
          db.close();
        });
    });
  });
}

