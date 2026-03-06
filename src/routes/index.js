const express = require('express');
const mahasiswaRoutes = require('../modules/mahasiswa/mahasiswa.routes');

const router = express.Router();

// Register all module routes here
router.use('/mahasiswa', mahasiswaRoutes);

// Export centralized router
module.exports = router;
