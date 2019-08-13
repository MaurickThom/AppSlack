const {
    json,
    static,
    urlencoded
} = require('express'),
    express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express(),
    WebSocketServer = require('ws').Server
const myData = [5, 12, 7, 1, 22]
const updateData = (index, value) => (
    myData[index] += value
)


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
        let msg = JSON.parse(message)
        
        updateData(msg.product, msg.quantity)

        ws.send(JSON.stringify(myData))
    })

})
