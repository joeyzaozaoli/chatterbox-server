var messages = {results:
  [ {username: 'josephine', text: 'Hey Hey Hey', roomname: 'Pinnacles'},
    {username: 'john', text: 'Hello Hello Hello', roomname: 'Valley'} ]
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var gatherMessage = function(request, callback) {
  var dataStream = '';
  request.on('data', function(chunk) {
    dataStream += chunk.toString();
  });
  request.on('end', function() {
    var msgObj = JSON.parse(dataStream);
    callback(msgObj);
  });
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var url = request.url.split('?')[0];

  if (url === '/classes/messages') {

    if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();

    } else if (request.method === 'GET') {
      headers['Content-Type'] = 'application/json';
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages));

    } else if (request.method === 'POST') {
      gatherMessage(request, function(msgObj) {
        messages.results.unshift(msgObj);
        response.writeHead(201, headers);
        response.end(JSON.stringify(null));
      });
    }

  } else {
    response.writeHead(404, headers);
    response.end();
  }

};

exports.requestHandler = requestHandler;