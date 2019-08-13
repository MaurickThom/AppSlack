const {
    json,
    static,
    urlencoded
} = require('express'),
    express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express(),
    WebSocketServer = require('ws').Server,
    myData = [5, 12, 7, 1, 22]

app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({
    extended: false
}))
app.use(static(`${__dirname}/public`))

/**
 * WebSocket server
 */
app.listen(8080, () => console.log('Listen'))
const wsServer = new WebSocketServer({
    port:1700
})
wsServer.on('connection', function (ws) {
    ws.on('message', function (message) {
        ws.send(myData)
    })

})
