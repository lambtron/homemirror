
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
	  }
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
 * Get a comic at 3:30 pm everyday or when the server reloads
 */

SyncedCron.add({
	name: 'Get xkcd',
	schedule: function(parser) {
    return parser.cron('0 30 15 1/1 * ? *');
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
	var xkcdcomics = {
		title: content.title,
		img: content.img,
		alt: content.alt
	};
    Comics.insert(xkcdcomics);
  }



