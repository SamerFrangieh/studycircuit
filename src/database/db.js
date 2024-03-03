//setting the database up 



function connect() {
  const sqlite3 = require("sqlite3").verbose();
  return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./studentdb.db", sqlite3.OPEN_READWRITE, (err) => {
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






