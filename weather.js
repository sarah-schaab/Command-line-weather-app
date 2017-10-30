const https = require('https');
const api = require('./api.json');

// Print out temp details

function printWeather(weather) {
  const message =  `Current temp in ${weather.location.city} is
${weather.current_observation.temp_f}F`;
  console.log(message);
}


// Print out error message
function printError(error) {
  console.error(error.message);  
}

function get(query) {
  const readableQuery = query.replace('_', ' ');
  try {
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
      if (response.statusCode === 200) {  
      let body = "";
        // Read the data
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
            try {        
            const weather = JSON.parse(body);
            //Parse data
            printWeather(weather);
            //Print the data
      } else {
          const queryError = new Error(`the location "${readableQuery}" was not found`);
          printError(queryError);
      } catch (error) {
        printError(error);
      }
        });
  } else {
    const statusCodeError = new Error(`there was an error getting the message for ${readableQuery}, (${http.STATUS_CODES[response.statusCode]})`);
  }
    });
}

module.exports.get = get;
