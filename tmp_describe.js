require('dotenv').config();
const sequelize = require('./src/config/databaseConfig');

async function describe() {
    try {
        await sequelize.authenticate();
        const jadwal = await sequelize.getQueryInterface().describeTable('wastu_jadwal_kuliah');
        const krs = await sequelize.getQueryInterface().describeTable('krs_new');
        const semester = await sequelize.getQueryInterface().describeTable('semester');
        
        console.log("=== wastu_jadwal_kuliah ===");
        console.log(jadwal);
        console.log("=== krs_new ===");
        console.log(krs);
        console.log("=== semester ===");
        console.log(semester);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
describe();
