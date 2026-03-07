const { DataTypes } = require('sequelize');
const db = require('../../config/databaseConfig');

const JadwalKuliah = db.define('wastu_jadwal_kuliah', {
    id_jadwal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_kls: { type: DataTypes.INTEGER, allowNull: false },
    h2: { type: DataTypes.STRING(10), allowNull: false },
    j1: { type: DataTypes.STRING(10), allowNull: false },
    j2: { type: DataTypes.STRING(10), allowNull: false },
    kode: { type: DataTypes.STRING(10), allowNull: false },
    mk: { type: DataTypes.STRING(50), allowNull: false },
    sks: { type: DataTypes.TINYINT, allowNull: false },
    dosen: { type: DataTypes.STRING(100), allowNull: false },
    ruang: { type: DataTypes.STRING(50), allowNull: false },
    kelas: { type: DataTypes.STRING(15), allowNull: false },
    prodi: { type: DataTypes.STRING(25), allowNull: false },
}, {
    tableName: 'wastu_jadwal_kuliah',
    timestamps: false,
});

module.exports = JadwalKuliah;
