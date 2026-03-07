const JadwalKuliah = require('./jadwalkuliah.model');
const KrsNew = require('./krs.model');
const Semester = require('./semester.model');

// Mendapatkan Jadwal Kuliah Mahasiswa Login (Berdasarkan NIPD)
exports.getJadwalKuliah = async (req, res) => {
    /*  #swagger.tags = ['Mahasiswa (Jadwal & Akademik)']
        #swagger.description = 'Endpoint untuk mendapatkan jadwal kuliah mahasiswa yang sedang login (berdasarkan NIPD yang tersimpan di Token JWT). Hanya menampilkan jadwal pada semester yang sedang aktif.'
        #swagger.security = [{ "bearerAuth": [] }]
    */
    try {
        // req.user.nipd berasal dari authMiddleware setelah decode JWT
        const nipd = req.user.nipd; 

        if (!nipd) {
            return res.status(400).json({ message: "NIPD tidak ditemukan pada token" });
        }

        const jadwal = await JadwalKuliah.findAll({
            include: [
                {
                    model: KrsNew,
                    required: true,
                    where: { nipd: nipd },
                    include: [
                        {
                            model: Semester,
                            as: 'semester',
                            required: true,
                            where: { a_periode_aktif: 1 }
                        }
                    ]
                }
            ],
            order: [[KrsNew, 'id_krs', 'DESC']]
        });

        res.status(200).json({
            message: 'Success retrieving schedules',
            data: jadwal
        });
        
    } catch (error) {
        console.error('Error saat mengambil jadwal:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil jadwal kuliah', error: error.message });
    }
};
