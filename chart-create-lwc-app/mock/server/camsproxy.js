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

const proxy = httpProxy.createProxyServer({});

const [, , bearer] = process.argv;

// console.log('bearer', bearer);

if (bearer) {
    //
    // Create your custom server and just call `proxy.web()` to proxy
    // a web request to the target passed in the options
    // also you can use `proxy.ws()` to proxy a websockets request
    //
    const server = http.createServer(function (req, res) {
        // You can define here your custom logic to handle the request
        // and then proxy the request.

        // console.log('req.headers', req.headers);
        
        req.headers.authorization = `Bearer ${bearer}`;
        // console.log('req.headers', req.headers);
        console.log('req', req)
        

        proxy.web(req, res, { target });
    });

    console.log(`listening on port ${port}`);
    server.listen(port);
} else {
    console.log(
        'This script expects a bearer token retrieved from the cams server, and submitted as an argument',
    );
    process.exit();
}
