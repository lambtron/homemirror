
/**
 * Collections.
 */

Predictions = new Mongo.Collection("predictions");

/**
 * Client.
 */

if (Meteor.isClient) {

  // When Headlines updates, send update to news template.
  // Template.muni.helpers({
  //   headlines: function() {
  //     return Headlines.find({});
  //   }
  // });
  // Meteor.call('muniStart');
}

/**
 * Server.
 */

if (Meteor.isServer) {

  Meteor.methods({
    muniStart: function() {
      muni();
    }
  });
}

// Every hour, ping nyt for new headlines.
function muni() {
  var url = 'http://nextbus-predictions.herokuapp.com/api/predictions';
  var post = Meteor.wrapAsync(HTTP.post);
  var load = {
    data: {"stops":[{"route":"2", "stpTag":"6608"}]},
    headers: {"Content-type": "application/json"}
  };
  var res = post(url, load);
  var content = JSON.parse(res.content);

  console.log(content);

  // Save to Collection.
  // Predictions.remove({});
  // for (var i = 0; i < content.results.length; i++) {
  //   Predictions.insert(content.results[i]);
  // }
}

/**
 * Cronjob.
 */

// SyncedCron.add({
//   name: 'Get headlines',
//   schedule: function(parser) {
//     return parser.cron('0 0 0/1 1/1 * ? *');
//   },
//   job: nytimes
// });
