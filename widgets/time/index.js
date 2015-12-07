
/**
 * Client.
 */

if (Meteor.isClient) {

  /**
   * Return time.
   */
	

  Template.time.helpers({
    time: function() {
      return Chronos.liveMoment().tz('America/Los_Angeles').format("hh:mma");  
	}

  });
}
