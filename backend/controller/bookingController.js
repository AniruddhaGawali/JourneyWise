const { default: mongoose } = require('mongoose');
const Bookings = require('../model/booking');
const { ObjectId } = require('mongodb');

exports.createBooking = async (req, res) => {
  console.log(req.body);
  const newBooking = new Bookings({
    packageId: req.body.packageId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    package: req.body.package,
    bookingDate: req.body.bookingDate,
    noOfTravellers: req.body.noOfTravellers,
    request: req.body.request,
  });

  try {
    const booking = await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const booking = await Bookings.aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'packageId',
          foreignField: '_id',
          as: 'package',
        },
      },
      {
        $unwind: '$package',
      },
    ]);
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.aggregate([
      {
        $lookup: {
          from: 'packages',
          localField: 'packageId',
          foreignField: '_id',
          as: 'package',
        },
      },
      {
        $unwind: '$package',
      },
    ]);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
