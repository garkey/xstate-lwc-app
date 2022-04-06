// var httpProxy = require('http-proxy');
// httpProxy
//     .createProxyServer({
//         target: 'http://camsdev-1266214049.us-west-2.elb.amazonaws.com',
//     })
//     .listen(3008);

const target = 'http://camsdev-1266214049.us-west-2.elb.amazonaws.com';
const port = 3008;

const http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//

const proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

const server = http.createServer(function (req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.

    // console.log('req', req)
    console.log('req.headers', req.headers)
    
    req.headers.authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBsb2NhbGhvc3QiLCJhdXRoIjoiUk9MRV9VU0VSLFJPTEVfQURNSU4iLCJleHAiOjE2NDkzNjAxNjR9.4RPwGTpkJFu6Bq0cA_4aKces6Lvz4Ps5UAdbaylPGmKjsiu3ubU6eh0p0WhK9KXT3NPkkN9djG-xfAGsIwoblA`


    proxy.web(req, res, { target });
});

console.log(`listening on port ${port}`);
server.listen(port);
