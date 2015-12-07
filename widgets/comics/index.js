
/**
 * Collections.
 */
Comics = new Mongo.Collection("comics");

/**
 * Client.
 */

if (Meteor.isClient) {
  // When Comics updates, send update to xkcd template
  Meteor.startup(function() {
  Meteor.call('comicStart');
  });

  Template.comics.helpers({
	  imageurl: function() {
		  return Comics.findOne().img;
	  },
	  title: function(){
		  return Comics.findOne().title;
	  },
	  alt: function(){
		  return Comics.findOne().alt;
	  },
	  tasks: [
		{ text: "This is task 1" },
		{ text: "This is task 2" },
		{ text: "This is task 3" }
    ]
  });
  
}

/**
 * Server.
 */

if (Meteor.isServer) {
  Meteor.methods({
    comicStart: function() {
	  xkcd();
      SyncedCron.start();
    }	
  });
  
  /** content.results.length
 * Cronjob.
 */

SyncedCron.add({
	name: 'Get xkcd',
	schedule: function(parser) {
     return parser.cron('30 15 ? * *');
   },
   job: xkcd
});
}
  
function xkcd(){
	var url = 'http://xkcd.com/info.0.json';
	var get = Meteor.wrapAsync(HTTP.get);
	var res = get(url);
	var content = JSON.parse(res.content);
	
	//Save to Collection
	Comics.remove({});
	var comics = {
		title: content.title,
		img: content.img,
		alt: content.alt
	};
    Comics.insert(comics);
  }



