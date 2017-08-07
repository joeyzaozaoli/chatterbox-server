var messages = {results:
  [ {username: 'josephine', text: 'Hey Hey Hey',roomname: 'Pinnacles'},
    {username: 'john', text: 'Hello Hello Hello', roomname: 'Valley'} ]
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'GET') {
    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    response.end(JSON.stringify(messages));
  }
};

exports.requestHandler = requestHandler;