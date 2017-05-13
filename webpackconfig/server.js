const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const apiProxy = httpProxy.createProxyServer();

(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack/common.config');
    const compiler = webpack(webpackConfig);

    app.use("/api/**", function(req, res) {
        req.url = req.baseUrl;
        apiProxy.web(req, res, {
            target: {
                port: 8080,
                host: '127.0.0.1',
            }
        }, error => console.error('API_PROXY_ERROR', error));
    });

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));

    app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
app.use("/api/**", function(req, res) {
    req.url = req.baseUrl;
    apiProxy.web(req, res, {
        target: {
            port: 8080,
            host: 'localhost',
        }
    }, error => console.error('API_PROXY_ERROR', error));
});