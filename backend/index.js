import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/db.js"; // Assuming you have a database connection setup
import userRoutes from "./routes/userRoutes.js"; // Assuming you have routes set up

dotenv.config();

// Create an instance of Express
const app = express();

// Port number
const PORT = process.env.PORT || 8000;

// Database connection
connection();

// CORS Configuration
const allowedOrigins = [
  'https://ecommerceseproject-hpq3xekl2-abdul-qayyum-rajpoots-projects.vercel.app', // Allow specific frontend URL
  'https://ecommerceseproject.vercel.app', // Add other allowed origins as needed
  // Add more origins if you need to support multiple environments or subdomains
];

// CORS Middleware Setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request if the origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  preflightContinue: false, // Don't pass the request to the next middleware for OPTIONS requests
  optionsSuccessStatus: 200 // For legacy browser support (old versions of IE)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Root route for health check
app.get("/", (req, res) => {
  res.json({ Message: "Server is running correctly" });
});

// Handle all preflight requests (OPTIONS)
app.options('*', cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
