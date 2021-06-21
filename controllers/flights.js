const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { title: 'All Flights', flights });
    });
    console.log('index controller function working');
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.timestamps;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {departsDate});
    res.render('flights/new');
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) {
            console.log('Error detected in flight input');
            return res.render('flights/new');
        }
        console.log(flight);
        res.redirect('/flights');
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flights) {
        res.render('flights/show', {
            title: 'Flight Information', flights
        })
    })
}