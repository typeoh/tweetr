"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, data) => {  
        if (err) {
          callback(err);
        } else {
          callback(null, data);  
        }

      });
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback); 
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      // callback(null, db.tweets.sort(sortNewestFirst));
    }
  }
}
