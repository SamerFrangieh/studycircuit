const sqlite3 = require('sqlite3').verbose();

// Connect to a database (or create it if it doesn't exist)
let db = new sqlite3.Database('./mydb.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`, 
        (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Table created or already exists.');
            }
        });
  }
});
