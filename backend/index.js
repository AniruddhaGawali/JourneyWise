const express = require('express');
const app = express();
const cors = require('cors');

const {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} = require('./controller/packageController');

const {
  createBooking,
  getAllBookings,
  getBookById,
} = require('./controller/bookingController');
const { loginAdmin } = require('./controller/adminController');

const connectDB = require('./db');
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.send('API is working');
});

app.get('/api/packages', getAllPackages);
app.get('/api/packages/:id', getPackageById);
app.post('/api/packages', createPackage);
app.put('/api/packages/:id', updatePackage);
app.delete('/api/packages/:id', deletePackage);

app.post('/api/bookings', createBooking);
app.get('/api/bookings', getAllBookings);
app.get('/api/bookings/:id', getBookById);

app.post('/api/admin/login', loginAdmin);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
