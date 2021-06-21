const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Delta', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
        required: true
    },
    departs: {
        type: Date,
        default: function() {
            let today = new Date();
            // update default year to one year from today
            let updatedYear = today.getFullYear() + 1;
            return updatedYear+'-'+(today.getMonth()+1)+'-'+today.getDate();
        }
    },
    destination: {
        type: [destinationSchema] // embedded documents
    },
}, {
    timestamps: true
});

// compiles the schema into a model and exports it
module.exports = mongoose.model('Flight', flightSchema)