
require('dotenv').config();
const sequelize = require('./src/config/databaseConfig');

const app = require('./src/app');

const _PORT = process.env.PORT || 3000;
const _HOST = process.env.HOST || 'localhost';

// Cek koneksi database
sequelize.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
        // // Menampilkan list tabel
        // sequelize.sync().then(() => {
        //     return sequelize.getQueryInterface().showAllTables();
        // }).then((tables) => {
        //     console.log('List tabel:', tables);
        // }).catch(err => {
        //     console.error('Error saat menampilkan tabel:', err);
        // });
        // // Menampilkan list attribut table
        // sequelize.getQueryInterface().describeTable('mahasiswa_pt').then(attributes => {
        //     console.log('List atribut dari tabel:', attributes);
        // }).catch(err => {
        //     console.error('Error saat mendapatkan atribut tabel:', err);
        // });

    })
    .catch(err => {
        console.error('Tidak dapat terhubung ke database:', err);
    });
app.listen(_PORT, () => {
    console.log(`Server started on http://${_HOST}:${_PORT}`);
});