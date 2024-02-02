const db = require('../db');
const getUserByCredentials = async (username, password) => {
    try {
        if (!username || !password) {
            return [];
        }
        const [rows] = await db.promise().execute('SELECT id, name, age, username FROM emp WHERE username = ? AND password = ?', [username, password]);
        if (!rows || rows.length === 0) {
            return [];
        }
        return rows;
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Rethrow the error to be caught in the controller
    }}
module.exports = {
  getUserByCredentials,
}