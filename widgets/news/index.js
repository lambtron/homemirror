
/**
 * Collections.
 */

Headlines = new Mongo.Collection("headlines");

/**
 * Client.
 */

if (Meteor.isClient) {

  // When Headlines updates, send update to news template.
  Template.news.helpers({
    headlines: function() {
      return Headlines.find({});
    },
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });
  Meteor.call('newsStart');
}

/**
 * Server.
 */

if (Meteor.isServer) {

  Meteor.methods({
    newsStart: function() {
      nytimes();
      // SyncedCron.start();
    }
  });
}

// Every hour, ping nyt for new headlines.
function nytimes() {
  var apiKey = 'beabcdb1445a9d428c8e67c070b8babb:19:73127967';
  var url = 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=';
  var get = Meteor.wrapAsync(HTTP.get);
  var res = get(url + apiKey);
  var content = JSON.parse(res.content);

  // Save to Collection.
  Headlines.remove({});
  for (var i = 0; i < content.results.length; i++) {
    console.log(content.results[i]);
    Headlines.insert(content.results[i]);
  }
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
