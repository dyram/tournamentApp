const model = require("../models");
const Tournament = model.Tournament;

Tournaments = () => { };

Tournaments.addTournament = async (tName, tDesc, available, seats, seatCost) => {
    let promise = Tournament.create({
        tName: tName,
        tDesc: tDesc,
        available: available,
        seats: seats,
        seatCost: seatCost,
        availSeats: seats
    });
    return promise;
};

Tournaments.getTournament = async () => {
    let promise = await Tournament.findAll();
    return promise;
};


module.exports = Tournaments;
