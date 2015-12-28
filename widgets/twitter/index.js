// /**
 // * Collections.
 // */

// Tweets = new Mongo.Collection("tweets");

// if (Meteor.isServer) {
	  // Meteor.methods({
    // tweetStart: function() {
		// console.log("Before gettweets")
      // gettweets();
	  // console.log("After gettweets")
      // SyncedCron.start();
	  // console.log("After Cron")
    // }
  // });
// }
// if (Meteor.isClient) {
	  // Template.twitter.helpers({
    // tweets: function() {
		// gettweets();
// /*	if (Tweets.find().count() > 6 ) {
		// Tweets.remove();
	// }
      // return Tweets;
	  // console.log(Tweets);
    // }
  // });
  // */
// }
	
// function gettweets() {
	// var T = new Twit({
		// consumer_key:         ''
	// , consumer_secret:      ''
	// , access_token:         ''
	// , access_token_secret:  ''
	// })  ;
	// var stream = T.stream('statuses/filter', { track: '#nasa', language: 'en' });
	// stream.on('tweet', function (tweet) {
//// tweet.user.name + ' @' + tweet.user.screen_name + ' ' + tweet.text)
  // Tweets.insert(tweet.text);
// });
	
// /**   for (var i = 0; i <5; i++) {
////   console.log(content.results[i]);
    // Tweets.insert(tweet.user.name[i]);
  // }
  // console.log(Tweets)
  // **/
// }

// SyncedCron.add({
  // name: 'Get tweets',
  // schedule: function(parser) {
    // return parser.cron('*/1 * * * *');
  // },
  // job: gettweets
// });	
	