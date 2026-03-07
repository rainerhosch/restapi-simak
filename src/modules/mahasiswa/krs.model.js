const { DataTypes } = require('sequelize');
const db = require('../../config/databaseConfig');
const JadwalKuliah = require('./jadwalkuliah.model');

const KrsNew = db.define('krs_new', {
    id_krs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_mk: { type: DataTypes.INTEGER, allowNull: false },
    id_jurusan: { type: DataTypes.STRING(6), allowNull: false },
    id_kurikulum: { type: DataTypes.STRING(5), allowNull: false },
    nipd: { type: DataTypes.STRING(15), allowNull: false },
    id_tahun_ajaran: { type: DataTypes.INTEGER, allowNull: false },
    kode_kelas: { type: DataTypes.STRING(5), allowNull: false },
    smtr: { type: DataTypes.INTEGER, allowNull: false },
    sks: { type: DataTypes.INTEGER, allowNull: false },
    id_dosen: { type: DataTypes.STRING(11), allowNull: false },
    no_validasi: { type: DataTypes.STRING(30), allowNull: false },
    tanggal_validasi: { type: DataTypes.DATE, allowNull: false },
    tanggal_krs: { type: DataTypes.DATE, allowNull: false },
    a_absen: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    id_kls: { type: DataTypes.INTEGER, allowNull: false },
    is_delete: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'krs_new',
    timestamps: false,
});

// Relasi KRS terhadap Jadwal: Foreign Key (id_kls)
KrsNew.belongsTo(JadwalKuliah, { foreignKey: 'id_kls', targetKey: 'id_kls', as: 'jadwal' });
JadwalKuliah.hasMany(KrsNew, { foreignKey: 'id_kls', sourceKey: 'id_kls' });

module.exports = KrsNew;
