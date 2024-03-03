//setting the database up 



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
          const { first_name, last_name, email, password, major_id, language } = temporaryStorage;

          // SQL query to insert student data into the Students table
          const insertQuery = `
              INSERT INTO Students (first_name, last_name, email, password, major, language) 
              VALUES (${temporaryStorage.first_name} ,${temporaryStorage.last_name} ${temporaryStorage.email}, ${temporaryStorage.password}, ${temporaryStorage.major}, ${temporaryStorage.languages[0]});
          `;

          // Execute the SQL query with the provided student data
          db.run(insertQuery, [first_name, last_name, email, password, major_id, language], (err) => {
              if (err) {
                  console.error("Error inserting student:", err.message);
                  reject(false);
              } else {
                  console.log("Student inserted successfully");
                  resolve(true);
              }

              // Close the database connection
              db.close();
          });
      }).catch(error => {
          console.error("Error connecting to the database:", error);
          reject(false);
      });
  });
}


//aojgeg