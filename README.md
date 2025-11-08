🛒 Vibe Commerce: Mock Full-Stack Shopping Cart
This project is a complete full-stack implementation of a mock e-commerce shopping cart, built as a screening assignment for Vibe Commerce. It demonstrates core e-commerce flows, robust REST APIs, state management, and a clean, responsive UI.
✨ Features
Product Catalog: Responsive grid of mock products with themed names/images.
Cart Management: Add, update quantity, and remove items from the cart.
Real-time Totals: Dynamic calculation of the cart subtotal on the frontend.
Mock Checkout: Submits mock customer data, generates a unique receipt ID, and clears the cart.
DB Persistence (Bonus): Cart contents are persisted using MongoDB for a mock "guest session."
Clean Error Handling (Bonus): Implemented using React Hot Toast for beautiful, non-blocking notifications on API success/failure.
🛠️ Tech Stack
Component	Technology	Version / Tool
Frontend	React, React Router	create-react-app
Styling	Tailwind CSS	Utility-first, Responsive Design
API Client	Axios, React Hot Toast	HTTP requests and clean notifications
Backend	Node.js, Express.js	ES Module (import/export) Syntax
Database	MongoDB (Mongoose)	Data models for Product and CartItem
🚀 Local Setup & Installation
Prerequisites
Node.js (v18+)
MongoDB Instance (Local or MongoDB Atlas)
1. Backend Setup
code
Bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file and add your MongoDB connection string
# .env content example:
# MONGO_URI="mongodb+srv://<user>:<password>@<cluster>/VibeComCartDB"
# PORT=5000

# 4. Seed the database (Clears old data and inserts mock products/images)
npm run seed

# 5. Start the backend server (using ES Modules)
npm start 
# Server runs on http://localhost:5000
2. Frontend Setup
code
Bash
# 1. Navigate to the frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Start the React development server
npm start
# App opens on http://localhost:3000
 Backend API Endpoints
All endpoints are hosted at http://localhost:5000/api.
GET	/api/products	Retrieve all available products
GET	/api/cart	Get the current guest user's active cart and calculated total.	-
POST	/api/cart	Add a new item or update quantity.	{"productId": "65", "qty": 1}
DELETE	/api/cart/:id	Remove a specific cart item by its CartItem._id.	
POST	/api/checkout	Mock checkout; processes data, clears cart, returns receipt.	{"name": "Jane Doe", "email": "j@example.com"}
