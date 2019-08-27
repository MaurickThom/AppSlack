import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.URL_DB as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));