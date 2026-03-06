const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerDocs = require('./config/swagger.config');
const appRoutes = require('./routes/index');
const app = express();
/** 
 * Security Middlewares
 */
// 1. Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());
// 2. CORS configuration
// Adjust origin to your front-end domain in production
app.use(cors());
// 3. Basic Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
// Apply the rate limiting middleware to API calls only
app.use('/api/', apiLimiter);
/** 
 * Standard Middlewares
 */
app.use(express.json()); // Parses incoming JSON requests
/**
 * Swagger Docs Setup
 */
swaggerDocs(app, process.env.PORT);
/**
 * Routes
 */
app.get('/', (req, res) => {
    res.redirect('/api-docs'); // Redirect to documentation by default
});
// Mount the centralized router at /api/v1
app.use('/api/v1', appRoutes);
module.exports = app;