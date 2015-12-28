
/**
 * Icon mapping.
 */

var icons = {
  'clear-day': 'day-sunny',
  'clear-night': 'night-clear',
  'rain': 'rain',
  'snow': 'snow',
  'sleet': 'sleet',
  'wind': 'strong-wind',
  'fog': 'fog',
  'cloudy': 'cloudy',
  'partly-cloudy-day': 'day-cloudy',
  'partly-cloudy-night': 'night-cloudy',
  'hail': 'hail',
  'thunderstorm': 'thunderstorm',
  'tornado': 'tornado'
};

/**
 * Collections.
 */

Loc = new Mongo.Collection("loc");
Weather = new Mongo.Collection("weather");
DailyWeather = new Mongo.Collection("dailies");
Timezone = new Mongo.Collection("timezonify");
/**
 * Client.
 */

if (Meteor.isClient) {
  // Grab lat and lng from client, only once upon load.
  Tracker.autorun(function(computation) {
    if (Geolocation.latLng()) {
      computation.stop();
	  Loc.insert(Geolocation.latLng());
	  Meteor.call('startTimezone');
      Meteor.call('weatherStart');
    }
  });

  // When Weather updates, send update to template.
  Template.weather.helpers({
    min: function() {
      return Weather.findOne().minTemp;
    },
    max: function() {
      return Weather.findOne().maxTemp;
    },
    currenticon: function() {
      return icons[Weather.findOne().icon];
    },
	current: function(){
		return Weather.findOne().currentTemp;
	},
	dailies: function() {
		return DailyWeather.find({});
	},
	currentDay: function() {
		return Weather.findOne().time;
	}
  });
}

/**
 * Server.
 */

if (Meteor.isServer) {
  Meteor.startup(function() {
    Loc.remove({});
	Timezone.remove({})
  });

  Meteor.methods({
    weatherStart: function() {
	  forecast();
    },
	startTimezone: function() {
		getTimezone();
	}	
  });
  
  /**
 * Cronjob.
 */

SyncedCron.add({
  name: 'Get forecast',
  schedule: function(parser) {
    return parser.cron('0 0 0/1 1/1 * ? *');
  },
  job: forecast
});

}

// Every hour, ping forecast, save it.
function forecast() {
  var apiKey = Meteor.settings.forecastio_api.apiKey;
  var get = Meteor.wrapAsync(HTTP.get);
	var loc = Loc.find().fetch()[0];  
  var res = get('https://api.forecast.io/forecast/' + apiKey + '/' + loc.lat + ',' + loc.lng);
  var content = JSON.parse(res.content);
	
  // Parse the result.
  var weather = {
    icon: content.daily.data[0].icon,
    minTemp: Math.round(content.daily.data[0].apparentTemperatureMin),
    maxTemp: Math.round(content.daily.data[0].apparentTemperatureMax),
	currentTemp: Math.round(content.currently.apparentTemperature),
	time: moment.unix(content.daily.data[0].time).format('dd')
  };

  // Save to Collection.
  Weather.remove({});
  Weather.insert(weather);
  DailyWeather.remove({});
    for(var i = 0; i <6; i++) {
	DailyWeather.insert(content.daily.data[i+1]);
	id = DailyWeather.find({}).fetch()[i]._id;
	DailyWeather.update(id,{$set: {apparentTemperatureMin: Math.round(DailyWeather.find({}).fetch()[i].apparentTemperatureMin)} });
	DailyWeather.update(id,{$set: {apparentTemperatureMax: Math.round(DailyWeather.find({}).fetch()[i].apparentTemperatureMax)} });
	DailyWeather.update(id,{$set: {icon:icons[DailyWeather.find({}).fetch()[i].icon]}});
	DailyWeather.update(id,{$set: {time: moment.unix(DailyWeather.find({}).fetch()[i].time).format('dd')}});
	}
	
}
function getTimezone() {
	var loc = Loc.find().fetch()[0];
	var username = Meteor.settings.geonames_api.username;
	var get = Meteor.wrapAsync(HTTP.get);
	var res = HTTP.get('http://api.geonames.org/timezoneJSON?lat=' + loc.lat + '&lng=' + loc.lng + '&username=' + username);
	var content = JSON.parse(res.content);
	var timezone = {
		'timezoneid': content.timezoneId
	};
	Timezone.insert(timezone);
}
 
 
 
