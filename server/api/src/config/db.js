const mongoose = require('mongoose')

const connect = async() => {
    await mongoose.connect(process.env.ATLAS_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true
    })

    console.log('Connected to Database!')
}

module.exports = connect
