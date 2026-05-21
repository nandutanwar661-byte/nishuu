const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Agar environment variable me link milega toh Atlas se connect hoga, nahi toh local database chalega
        const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zoho_clone';
        
        await mongoose.connect(dbURI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;