
/**
 * Collections.
 */

var imageStore = new FS.Store.GridFS('images');
Images = new FS.Collection('images', {
	  stores: [imageStore]	
	});

/**
* Permissions
*/

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});


/**
 * Client.
 */

if (Meteor.isClient) {

  Template.image.helpers({
	  isdefault: function() {
		  if (Images.find().count() === 0) {
			  return true
		    } else {
			  return false	
			};
		},
	  photourl: function() {
		  return Images.find();	
	    }
	}); 
}

/**
 * Server.
 */

if (Meteor.isServer) {
      Meteor.startup(function () { 

	      // set our token
	      TelegramBot.token = Meteor.settings.telegram_api.token;
          TelegramBot.start(); // start the bot
			
          // add a listener for '/test'
          TelegramBot.addListener('/test', function(command) { 
              if(!command[1]) { // if no arguments
                  return false
              // if you return false the bot wont answer
                } else {
                // command[1] will be the first argument, command[2] the second etc
               // below the bot will reply with 'test: hi' if you sent him /test hi
                  return "debug: " + command.slice(1).join(' ')	
			    }  	  
            });
		
		// The command incoming_document is just a placeholder. This listener looks for all photos being sent. 
	      TelegramBot.addListener('/incoming_document', function(c, u, o) {
		      TelegramBot.send('The photo sizes are ' + o.photo[o.photo.length-1].file_size,o.chat.id);
		      var file = TelegramBot.method('getFile', {
				  file_id: o.photo[o.photo.length-1].file_id,
				}).result.file_path;
			  var url = 'https://api.telegram.org/file/bot' + TelegramBot.token + '/' + file;  
			  // A url is generated that is then inserted into GridFS.
			  var newfile = new FS.File(); // This could be grapped from the url
			  newfile.attachData(url, function() {console.log(arguments);});
			  Images.remove({});
			  Images.insert(newfile, function (error, fileObj) {
				  if (error){
					  throw error  // handle error 
					} else {
					  console.log("Image is being inserted");	
					};
				});  
			}, 'photo');
	    });
    };