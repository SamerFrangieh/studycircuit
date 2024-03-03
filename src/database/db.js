//setting the database up 

const sqlite3 = require("sqlite3").verbose();

let sql;

//connect to DB
const db = new sqlite3.Database("./studentdb.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});


//create tables
function createTables(){
  //interests
  sql = "CREATE TABLE IF NOT EXISTS Interests (interest_id INTEGER PRIMARY KEY , name TEXT NOT NULL UNIQUE);"
  db.run(sql);

  //major
  sql = "CREATE TABLE IF NOT EXISTS Major (major_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);"
  db.run(sql);


  //language
  sql = "CREATE TABLE IF NOT EXISTS Language (language_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);"
  db.run(sql);

  //courses
  sql = "CREATE TABLE IF NOT EXISTS Courses (course_id INTEGER PRIMARY KEY, major_id INTEGER, name TEXT NOT NULL UNIQUE, FOREIGN KEY(major_id) REFERENCES Major(major_id));"
  db.run(sql);

  //Students
  sql = "CREATE TABLE IF NOT EXISTS Students (studentid INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, major_id INTEGER, language INTEGER, FOREIGN KEY(major_id) REFERENCES Major(major_id));"
  db.run(sql);


  //course registration
  sql = "CREATE TABLE IF NOT EXISTS CourseRegistration (studentid INTEGER, course_id INTEGER, PRIMARY KEY(studentid), FOREIGN KEY(studentid) REFERENCES Students(studentid), FOREIGN KEY(course_id) REFERENCES Courses(course_id));"
  db.run(sql);

  //student matches 
  sql = "CREATE TABLE IF NOT EXISTS StudentsMatch (match_id INTEGER PRIMARY KEY, studentid1 INTEGER, studentid2 INTEGER, studentid3 INTEGER, FOREIGN KEY(studentid1) REFERENCES Students(studentid), FOREIGN KEY(studentid2) REFERENCES Students(studentid), FOREIGN KEY(studentid3) REFERENCES Students(studentid));"
  db.run(sql);

}


//populate the data

function populate(){
  //interests
  sql = "INSERT OR IGNORE INTO Interests (name) VALUES ('Technology'), ('Music'), ('Reading'), ('Traveling'), ('Cooking'), ('Sports'), ('Photography'), ('Gaming');";
  db.run(sql);

  // //major
  sql = "INSERT OR IGNORE INTO Major (name) VALUES ('Computer Science'), ('Engineering'), ('Information Technology');";
  db.run(sql);

  //language
  sql = "INSERT OR IGNORE INTO Language (name) VALUES ('English'),('Spanish'),('French'),('German'),('Chinese'),('Japanese'),('Russian'),('Arabic');";
  db.run(sql);


  //course 
  sql = "INSERT OR IGNORE INTO Courses (major_id, name) VALUES (1, 'Introduction to Computer Science'),(1, 'Data Structures and Algorithms'),(1, 'Computer Networks'),(1, 'Software Engineering'),(1, 'Database Systems'),(2, 'Engineering Mathematics I'),(2, 'Engineering Physics'),(2, 'Engineering Mechanics'),(2, 'Engineering Thermodynamics'),(2, 'Engineering Design'),(3, 'Introduction to Information Technology'),(3, 'IT Infrastructure Management'),(3, 'Database Management Systems'),(3, 'Network Security'),(3, 'Web Development');"
  db.run(sql);
}




