// var httpProxy = require('http-proxy');
// httpProxy
//     .createProxyServer({
//         target: 'http://camsdev-1266214049.us-west-2.elb.amazonaws.com',
//     })
//     .listen(3008);
const url = require('url');
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
        const allowedOrigins = ['localhost'];
        let allowedOrigin = false;
        if (req.headers.origin) {
            const originHostName = url.parse(req.headers.origin).hostname;
            if (
                originHostName &&
                allowedOrigins.some((o) => o === originHostName)
            ) {
                res.setHeader(
                    'access-control-allow-origin',
                    req.headers.origin,
                );
                res.setHeader('access-control-allow-credentials', 'true');
                allowedOrigin = true;
            }
        }

        if (req.headers['access-control-request-method']) {
            res.setHeader(
                'access-control-allow-methods',
                req.headers['access-control-request-method'],
            );
        }

        if (req.headers['access-control-request-headers']) {
            res.setHeader(
                'access-control-allow-headers',
                req.headers['access-control-request-headers'],
            );
        }

        if (allowedOrigin) {
            res.setHeader('access-control-max-age', 60 * 60 * 24 * 30);
            if (req.method === 'OPTIONS') {
                res.send(200);
                res.end();
            }
        }

        req.headers.authorization = `Bearer ${bearer}`;
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
