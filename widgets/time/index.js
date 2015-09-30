
/**
 * Client.
 */

if (Meteor.isClient) {

  /**
   * Return time.
   */

  Template.time.helpers({
    time: function() {
      return Chronos.liveMoment().format("hh:mma");
    }
  });
}
