const { DataTypes } = require('sequelize');
const db = require('../../config/databaseConfig');
const KrsNew = require('./krs.model');

const Semester = db.define('semester', {
    id_smt: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
    },
    nm_smt: { type: DataTypes.STRING(20), allowNull: false },
    smt: { type: DataTypes.TINYINT, allowNull: false },
    a_periode_aktif: { type: DataTypes.TINYINT, allowNull: false },
    tgl_mulai: { type: DataTypes.DATE, allowNull: false },
    tgl_selesai: { type: DataTypes.DATE, allowNull: false },
    id_thn_ajaran: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'semester',
    timestamps: false,
});

// Relasi KRS ke Semester
KrsNew.belongsTo(Semester, { foreignKey: 'id_tahun_ajaran', targetKey: 'id_smt', as: 'semester' });
Semester.hasMany(KrsNew, { foreignKey: 'id_tahun_ajaran', sourceKey: 'id_smt' });

module.exports = Semester;
