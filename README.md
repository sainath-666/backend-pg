# PG Booking Backend API

A Node.js/Express backend API for managing PG (Paying Guest) accommodations, bookings, and user authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **PG Management**: Create, read, update, and delete PG listings
- **Booking System**: Handle booking requests and management
- **Image Upload**: Cloudinary integration for image storage
- **MongoDB Database**: Mongoose ODM for data management
- **CORS Enabled**: Cross-origin resource sharing support

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend-pg
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

## 📁 Project Structure

```
backend-pg/
├── src/
│   ├── config/
│   │   ├── cloudinary.js    # Cloudinary configuration
│   │   └── db.js             # Database connection setup
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── models/
│   │   ├── Booking.js        # Booking model schema
│   │   ├── PG.js             # PG listing model schema
│   │   └── User.js           # User model schema
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication endpoints
│   │   ├── bookingRoutes.js  # Booking management endpoints
│   │   ├── pgRoutes.js       # PG listing endpoints
│   │   └── uploadRoutes.js   # Image upload endpoints
│   └── server.js             # Main application entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### PG Listings

- `GET /api/pgs` - Get all PG listings
- `GET /api/pgs/:id` - Get a specific PG listing
- `POST /api/pgs` - Create a new PG listing (protected)
- `PUT /api/pgs/:id` - Update a PG listing (protected)
- `DELETE /api/pgs/:id` - Delete a PG listing (protected)

### Bookings

- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create a new booking (protected)
- `PUT /api/bookings/:id` - Update a booking (protected)
- `DELETE /api/bookings/:id` - Delete a booking (protected)

### Uploads

- `POST /api/uploads` - Upload images to Cloudinary (protected)

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🧰 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (not yet implemented)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Sainathreddy

## 🐛 Known Issues

- Test suite not yet implemented

## 🔮 Future Enhancements

- [ ] Add comprehensive test coverage
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] Implement email notifications
- [ ] Add search and filter functionality
- [ ] Implement pagination for listings
