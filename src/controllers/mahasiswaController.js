const Mahasiswa = require('../models/mahasiswaModel');
const Mahasiswapt = require('../models/mahasiswaptModel');

const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Import built-in module Node.js untuk kriptografi

// Fungsi Login Mahasiswa
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // 1. Validasi input kosong
    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password harus diisi' });
    }

    try {
        // 2. Cari mahasiswa berdasarkan Nim
        const mpt = await Mahasiswapt.findOne({ where: { nipd: username } });

        if (!mpt) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        // 3. Verifikasi Password dengan MD5
        // Ubah input password dari user menjadi MD5 hash string (hexadecimal)
        const hashedInputPassword = crypto.createHash('md5').update(password).digest('hex');

        // Bandingkan hash input dengan password yang ada di database
        if (hashedInputPassword !== mpt.password) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        // 4. Buat Token JWT jika cocok
        const secretKey = process.env.JWT_SECRET || 'wastu_digital_secret_key'; 
        const token = jwt.sign(
            { 
                id_pd: mpt.id_pd, 
                nipd: mpt.nipd 
            },
            secretKey,
            { expiresIn: '24h' } // Token berlaku 24 jam
        );
        
        const mhs = await Mahasiswa.findOne({ where: { id_pd:  mpt.id_pd } });

        // 5. Kirim Response Sukses
        res.status(200).json({
            message: 'Login berhasil',
            token: token,
            data: {
                id_pd: mpt.id_pd,
                nim: mpt.nipd,
                nama: mhs.nm_pd,
                email: mpt.email_studen,
                // Tambahkan field lain jika diperlukan
            }
        });

    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat proses login', error: error.message });
    }
};


// Mendapatkan semua data mahasiswa
exports.getAllMahasiswa = async (req, res) => {
    const _limit = parseInt(req.query.limit) || 10;
    const _offset = parseInt(req.query.offset) || 0;
    try {
        const mahasiswa = await Mahasiswa.findAll({
            offset: _offset,
            limit: _limit
        });
        res.status(200).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data mahasiswa', error });
    }
};

// Mendapatkan data mahasiswa berdasarkan ID
exports.getMahasiswaById = async (req, res) => {
    const id = req.params.id;
    try {
        const mahasiswa = await Mahasiswa.findByPk(id);
        if (mahasiswa) {
            res.status(200).json(mahasiswa);
        } else {
            res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data mahasiswa', error });
    }
};

// Menambahkan data mahasiswa baru
exports.createMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.create(req.body);
        res.status(201).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data mahasiswa', error });
    }
};

// Mengupdate data mahasiswa
exports.updateMahasiswa = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Mahasiswa.update(req.body, {
            where: { id_pd: id }
        });
        if (updated) {
            const updatedMahasiswa = await Mahasiswa.findByPk(id);
            res.status(200).json(updatedMahasiswa);
        } else {
            res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate data mahasiswa', error });
    }
};

// Menghapus data mahasiswa
exports.deleteMahasiswa = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Mahasiswa.destroy({
            where: { id_pd: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data mahasiswa', error });
    }
};
