const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        console.log('init db config');
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            // useCreateIndex : true,
        });
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Database Error - hable con el admin');
    }
}

module.exports = {
    dbConnection
}

// mongoose.connect('mongodb://localhost:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));