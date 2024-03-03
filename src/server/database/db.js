//setting the database up 

const path = require("path")

function connect() {
  const sqlite3 = require("sqlite3").verbose();
  return new Promise((resolve, reject) => {
    const ROOT_DIR = path.join(__dirname, "studentdb.db") //dir to serve static files from
      const db = new sqlite3.Database(ROOT_DIR, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              console.error(err.message);
              reject(err);
          } else {
              resolve(db);
          }
      });
  });
}



//get all data 

function selectAllLanguages() {
  return new Promise((resolve, reject) => {
      connect().then(db => {
          if (!db) {
              console.error("Failed to connect to the database.");
              reject("Failed to connect to the database.");
              return;
          }

          const selectQuery = "SELECT name FROM Language";

          db.all(selectQuery, [], (err, rows) => {
              if (err) {
                  console.error(err.message);
                  reject(err);
              } else {
                  const array = rows.map(row => row.name);
                  resolve(array);
              }
              db.close();
          });
      }).catch(reject);
  });
}


function selectAllMajors() {
  return new Promise((resolve, reject) => {
      connect().then(db => {
          if (!db) {
              console.error("Failed to connect to the database.");
              reject("Failed to connect to the database.");
              return;
          }

          const selectQuery = "SELECT name FROM Major";

          db.all(selectQuery, [], (err, rows) => {
              if (err) {
                  console.error(err.message);
                  reject(err);
              } else {
                  const array = rows.map(row => row.name);
                  resolve(array);
              }
              db.close();
          });
      }).catch(reject);
  });
}


function selectAllInterests() {
  return new Promise((resolve, reject) => {
      connect().then(db => {
          if (!db) {
              console.error("Failed to connect to the database.");
              reject("Failed to connect to the database.");
              return;
          }

          const selectQuery = "SELECT name FROM Interests";

          db.all(selectQuery, [], (err, rows) => {
              if (err) {
                  console.error(err.message);
                  reject(err);
              } else {
                  const array = rows.map(row => row.name);
                  resolve(array);
              }
              db.close();
          });
      }).catch(reject);
  });
}

function selectAllCourses() {
  return new Promise((resolve, reject) => {
      connect().then(db => {
          if (!db) {
              console.error("Failed to connect to the database.");
              reject("Failed to connect to the database.");
              return;
          }

          const selectQuery = "SELECT name FROM Courses";

          db.all(selectQuery, [], (err, rows) => {
              if (err) {
                  console.error(err.message);
                  reject(err);
              } else {
                  const array = rows.map(row => row.name);
                  resolve(array);
              }
              db.close();
          });
      }).catch(reject);
  });
}




//print to console

// Example usage:
selectAllLanguages().then(languages => {
  console.log("Languages:", languages);
}).catch(error => {
  console.error("Error:", error);
});


// Example usage:
selectAllMajors().then(majors => {
  console.log("Majors:", majors);
}).catch(error => {
  console.error("Error:", error);
});


// Example usage:
selectAllInterests().then(interests => {
  console.log("Interests:", interests);
}).catch(error => {
  console.error("Error:", error);
});


// Example usage:
selectAllCourses().then(courses => {
  console.log("Courses:", courses);
}).catch(error => {
  console.error("Error:", error);
});



function insertStudent(temporaryStorage) {
  return new Promise((resolve, reject) => {
      connect().then(db => {
          if (!db) {
              console.error("Failed to connect to the database.");
              reject("Failed to connect to the database.");
              return;
          }

          // Assuming `Students` table has columns like id, name, major, etc.
          // and `student` is an object with properties matching those column names.
          const insertQuery = `INSERT INTO Students (first_name, last_name, email, password, major, language) VALUES (?, ?, ?, ?, ?, ?)`;

          // Using the properties of the student object as parameters for the INSERT query.
          db.run(insertQuery, [temporaryStorage.firstname, temporaryStorage.lastname, temporaryStorage.email, temporaryStorage.password,temporaryStorage.major, temporaryStorage.languages[0] ], function(err) {
              if (err) {
                  console.error(err.message);
                  reject(err);
              } else {
                  // "this" refers to the statement object that has executed the query.
                  // "lastID" is a property of "this" when an INSERT operation is performed,
                  // representing the last inserted row ID.
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
                  resolve(this.lastID);
              }
              db.close();
          });
      }).catch(reject);
  });
}



module.exports = {
    selectAllLanguages,
    selectAllMajors,
    selectAllInterests,
    selectAllCourses,
  };
  