const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'devportal',
    password: 'postgres',
    port: 5432,
});

// Function to get a file from the database
async function getFileFromDatabase(fileType, fileName) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT content FROM "Files" WHERE type = $1 AND name = $2', [fileType, fileName]);
        return res.rows[0]?.content || null;
    } finally {
        client.release();
    }
}

// Function to get all partials
async function getAllPartials() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT name, content FROM "Files" WHERE type = $1', ['partial']);
        return res.rows.reduce((partials, row) => {
            partials[row.name.replace('.hbs', '')] = row.content.toString();
            return partials;
        }, {});
    } finally {
        client.release();
    }
}

module.exports = {
    getFileFromDatabase,
    getAllPartials,
};
