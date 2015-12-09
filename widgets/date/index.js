
/**
 * Client.
 */
//Timezone = Mongo.Collection("timezonify");
if (Meteor.isClient) {

  /**
   * Return date.
   */
//console.log(Timezone.timezoneid);
  Template.date.helpers({
    date: function() {
		var timezone = Timezone.findOne().timezoneid;
      return Chronos.liveMoment().tz(timezone).format("dddd, MMM Do");
    }
  });
}
