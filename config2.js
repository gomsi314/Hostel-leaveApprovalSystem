const mysql = require('mysql');

// Database configuration
const connection = require("./config")
// Generate a random sequence
function generateRandomSequence(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sequence = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sequence += characters[randomIndex];
  }
  return sequence;
}

// Check if sequence is unique in the database
function isSequenceUnique(sequence, callback) {
  const query = 'SELECT COUNT(*) as count FROM leaverequest WHERE reqid = ?';
  connection.query(query, [sequence], (error, results) => {
    if (error) {
      callback(error);
    } else {
      const count = results[0].count;
      const isUnique = count === 0;
      callback(null, isUnique);
    }
  });
}

module.exports = {
  connection,
  generateRandomSequence,
  isSequenceUnique
};
