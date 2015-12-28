
/**
 * Client.
 */

if (Meteor.isClient) {

  /**
   * Return time.
   */
	

  Template.time.helpers({
    time: function() {
		var timezone = Timezone.findOne().timezoneid;
		return Chronos.liveMoment().tz(timezone).format("hh:mma");  
	}

  });
}
