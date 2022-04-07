const restify = require('restify');
const fs = require('fs');
const parse = require('csv-parse');

var serverdata;

function streamCsvRead(query, endcallback) {
    return new Promise((resolve, reject) => {
        const output = [];

        parse(serverdata, {
            trim: true,
            skip_empty_lines: true,
        })
            // Use the readable stream api
            .on('readable', function () {
                let record;
                while ((record = this.read())) {
                    output.push(record);
                }
            })
            // When we are done, test that the parsed output matched what expected
            .on('end', function () {
                const headers = output.shift();
                const resolvedjson = endcallback(query, headers, output);
                resolve(resolvedjson);
            });
    });
}

fs.readFile('../assetgrid_data_source.csv', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    // substring(1) is to remove a weird first character in the data string
    serverdata = data.substring(1);
});

async function respond(req, res, next) {
    const query = req.query;
    let endcallback;

    console.log('query', query);
    

    if (query.hasOwnProperty('view')) {

    }

    if (query.hasOwnProperty('targetData')) {
        endcallback = (q, headers, output) => {
            const targetData = q.targetData.split(',')[0];
            const filters = q.filters;
            const targetDataindex = headers.indexOf(targetData);
            const filtersIndex = headers.indexOf(filters);
            const ranks = [];

            if (targetDataindex === -1 || filtersIndex === -1) {
                throw new Error('got wrong params');
                return;
            }

            // const map = output.slice(0,10).reduce((acc, val, i) => {
            const map = output.reduce((acc, val, i) => {
                if (acc[val[filtersIndex]]) {
                    acc[val[filtersIndex]] = [
                        ...acc[val[filtersIndex]],
                        val[targetDataindex],
                    ];
                } else {
                    acc[val[filtersIndex]] = [val[targetDataindex]];
                }
                return acc;
            }, {});

            const entries = Object.entries(map);
            let modltupl = entries.map((m) => {
                const refcount = m[1].reduce((acc, val, i) => {
                    let rindx = ranks.indexOf(val);
                    if (rindx === -1) {
                        ranks.push(val);
                    }
                    rindx = ranks.indexOf(val);

                    if (acc[rindx]) {
                        acc[rindx] = acc[rindx] + 1;
                    } else {
                        acc[rindx] = 1;
                    }
                    return acc;
                }, []);
                return [m[0], ...refcount];
            });

            const keys = [targetData].concat(ranks);

            if (query.hasOwnProperty('sort')) {
                const indxofsort = keys.indexOf(query['sort']);
                const dir = query.hasOwnProperty('dir') && query['dir'];
                if (indxofsort > -1) {
                    modltupl = modltupl.sort((a, b) => {
                        return dir !== 'desc'
                            ? (b[indxofsort] || 0) - (a[indxofsort] || 0)
                            : (a[indxofsort] || 0) - (b[indxofsort] || 0);
                    });
                }
            }
            return [keys].concat(modltupl);
        };
    } else {
        endcallback = (q, headers, output) => {
            const targetData = q.targetData.split(',');
            const indexes = targetData.map((h) => headers.indexOf(h));
            return output.map((row) => indexes.map((i) => row[i]));
        };
    }

    const json = await streamCsvRead(query, endcallback);

    res.send(json);
    next();
}

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
});
server.get('/dcx_mock', respond);
// server.head('/hello/:name', respond);

server.listen(8081, function () {
    console.log('%s listening at %s', server.name, server.url);
});
