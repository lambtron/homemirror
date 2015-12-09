
/**
 * Client.
 */

if (Meteor.isClient) {

  /**
   * Return date.
   */

  Template.message.helpers({
    fragment1: function() {
      return Meteor.settings.public.fragment1;
	},
	emoji: function() {
		return Meteor.settings.public.emoji;
	},
	fragment2: function() {
		return Meteor.settings.public.fragment2;
	}
  });
}