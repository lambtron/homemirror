
/**
 * Client.
 */

if (Meteor.isClient) {

  /**
   * Return date.
   */

  Template.date.helpers({
    date: function() {
      return Chronos.liveMoment().tz('America/Los_Angeles').format("dddd, MMM Do");
    }
  });
}
