import { get } from 'request';

var muscle = 'biceps';
get({
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: {
    'X-Api-Key': 'UuRylwHO0fo57hxZhRoZhYTobArfCI6A1oI27TY2'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else return body;
});