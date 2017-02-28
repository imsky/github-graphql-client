var https = require('https');

function Request (options, cb) {
  var token = options.token;
  var query = options.query;
  var variables = options.variables || {};

  if (!token) {
    throw Error('Missing GitHub token');
  } else if (!query) {
    throw Error('Missing query');
  }

  var payload = {
    'query': query,
    'variables': variables
  };

  var payloadString = JSON.stringify(payload);

  var req = https.request({
    'hostname': 'api.github.com',
    'path': '/graphql',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Content-Length': payloadString.length,
      'Authorization': 'bearer ' + token,
      'User-Agent': 'GitHub GraphQL Client'
    }
  }, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk.toString('utf8'));
    });

    res.on('end', function () {
      if (res.statusCode !== 200) {
        cb(res.statusMessage);
        return;
      }

      var response = chunks.join('');
      var json;

      try  {
        json = JSON.parse(response);
      } catch (e) {
        cb('GitHub GraphQL API response is not able to be parsed as JSON');
        return;
      }

      if (!json.data) {
        if (json.errors) {
          cb(json.errors);
          return;
        } else {
          cb('Unknown GraphQL error');
          return;
        }
      }

      cb(null, json);
    });
  });

  req.on('error', function (err) { cb(err); });
  req.write(payloadString);
  req.end();
}

module.exports = Request;