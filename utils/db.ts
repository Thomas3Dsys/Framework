import mysql from 'mysql2/promise';

// Database connection configuration
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'readonly',
    password: '4*.a2vy!fBY1CMli',
    database: 'openshop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { pool };