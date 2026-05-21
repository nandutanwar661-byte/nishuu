const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database Connection call
connectDB();

// Middlewares (CORS setup jo local aur live dono frontend ko allow karega)
// Middlewares (CORS setup jo local aur live dono frontend ko allow karega)
const allowedOrigins = [
  'http://localhost:5173',                       // Aapka local development
  'https://nimble-toffee-50a5a3.netlify.app',     // Aapka deployed Netlify frontend
  'https://extraeffort-n3li.vercel.app'          // 🔥 AAPKA NAYA VERCEL URL (YAHAN ADD KIYA)
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Console Logger setup taaki terminal me path dikhe
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} request received at: ${req.url}`);
    next();
});

// Main Registered Routes Setup 
// ⚠️ DHYAN DEIN: Agar aapki files ka naam 'customer.js' hai toh yahan 'customer' likhein, agar 'customerRoutes.js' hai toh wahi rehne dein.
app.use('/api/customers', require('./routes/customerRoutes')); 
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/estimates', require('./routes/estimateRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// Root Fallback Route
app.get('/', (req, res) => {
    res.send('🚀 Zoho Clone Backend Server Running Perfectly.');
});

// Port activation setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running smoothly on port ${PORT}`);
});