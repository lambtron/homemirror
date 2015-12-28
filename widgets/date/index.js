
/**
 * Client.
 */
if (Meteor.isClient) {

  /**
   * Return date.
   */
  Template.date.helpers({
    date: function() {
		var timezone = Timezone.findOne().timezoneid;
      return Chronos.liveMoment().tz(timezone).format("dddd, MMM Do");
    }
  });
}
