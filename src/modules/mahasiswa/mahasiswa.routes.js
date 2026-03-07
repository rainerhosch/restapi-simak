const express = require('express');
const mahasiswaController = require('./mahasiswa.controller');
const jadwalKuliahController = require('./jadwalkuliah.controller');
const authMiddleware = require('../../middleware/authMiddleware'); // Import middleware

const router = express.Router();

// Route baru untuk login (TIDAK PERLU AUTH)
router.post('/login', mahasiswaController.login);

// Menerapkan middleware auth ke semua route di bawah ini
router.use(authMiddleware);

// Route untuk mendapatkan semua data mahasiswa
router.get('/list', mahasiswaController.getAllMahasiswa);

// Route untuk mendapatkan jadwal kuliah (Berdasarkan token)
router.get('/jadwal', jadwalKuliahController.getJadwalKuliah);

// Route untuk mendapatkan data mahasiswa berdasarkan ID
router.get('/detail/:id', mahasiswaController.getMahasiswaById);

// Route untuk menambahkan data mahasiswa baru
router.post('/', mahasiswaController.createMahasiswa);

// Route untuk mengupdate data mahasiswa
router.put('/:id', mahasiswaController.updateMahasiswa);

// Route untuk menghapus data mahasiswa
router.delete('/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;
