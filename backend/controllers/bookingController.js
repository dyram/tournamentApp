const model = require("../models");
const Booking = model.Booking;
const User = model.Users
const Tournament = model.Tournament

Bookings = () => { };

Bookings.addBookings = async (uid, tid, money, seatCost, availSeat) => {
    console.log(uid, tid, money, seatCost, availSeat)
    let promise = await Booking.create({
        TournamentId: tid,
        UserId: uid,
        mid: seatCost
    });

    let prom2 = await User.update({
        money: money - seatCost
    },
        {
            where: { id: uid }
        })

    let prom3 = await Tournament.update({
        availSeats: availSeat - 1
    },
        {
            where: { id: tid }
        })
    return { promise, prom2, prom3 };
};

Bookings.getBookings = async (uid) => {
    let promise = await Booking.findAll(
        {
            where: { UserId: uid },
            include: [
                {
                    model: User,
                    attributes: ["id", "money"]
                },
                {
                    model: Tournament,
                    attributes: ["availSeats", "available"]
                }
            ]
        });
    return promise;
};

Bookings.getBookedUsers = async (id) => {
    let promise = await Booking.findAll(
        {
            where: { TournamentId: id },
            include: [
                {
                    model: User,
                    attributes: ["email"]
                },
                {
                    model: Tournament,
                    attributes: ["tName"]
                }
            ]
        });
    return promise;
}


module.exports = Bookings;
