const {
    json,
    static,
    urlencoded
} = require('express'),
    express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({extended:false}))
app.use(static(`${__dirname}/public`))


app.listen(8080,()=>console.log('Listen'))