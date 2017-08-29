var mongoose = require('mongoose');
    mongoose.connect('mongodb://ferduff82:warrant2315@ds119370.mlab.com:19370/financebase');

var Schema = mongoose.Schema;

var dolarSchema = new Schema({
    dolaroficial: { type: String, required: true},
    dolarblue: { type: String, required: true},
    created_at: Date
});

dolarSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var dolar = mongoose.model('dolar', dolarSchema);

module.exports = dolar;