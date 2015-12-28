
/**
 * Collections.
 */
Messages = new Mongo.Collection("messagess");

/**
 * Client.
 */

if (Meteor.isClient) {
  // When Comics updates, send update to xkcd template
 
 
  Template.message.helpers({
	  messaging: function() {
		  return emojione.unicodeToImage(Messages.findOne().messaging);
		}
	}); 
}

/**
 * Server.
 */

if (Meteor.isServer) {
      Meteor.startup(function () { 
	      // set our token
	      if (Messages.find().count() === 0) {
		      var defaultmes = {
			      messaging: Meteor.settings.public.defaultmessage
			    };
		      Messages.insert(defaultmes);
		    };

	      TelegramBot.addListener('/m', function(command) { 
              if(!command[1]) {
		          return false
		        } else {
		          var id = Messages.findOne()._id;
		          Messages.update(id, {$set: {messaging: command.slice(1).join(' ')}});
		          return "Collection should be updated";
		        };
	        });
	    });
    };