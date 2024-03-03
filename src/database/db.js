//setting the database up 

const sqlite3 = require("sqlite3").verbose();

let sql;

//connect to DB
const db = new sqlite3.Database("./studentdb.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});



//create tables

//interests
sql = "CREATE TABLE Interests (interest_id INTEGER PRIMARY KEY, name TEXT NOT NULL);"
db.run(sql);

//major
sql = "CREATE TABLE Major (major_id INTEGER PRIMARY KEY, name TEXT NOT NULL);"
db.run(sql);


//language
sql = "CREATE TABLE Language (language_id INTEGER PRIMARY KEY, name TEXT NOT NULL);"
db.run(sql);

//courses
sql = "CREATE TABLE Courses (course_id INTEGER PRIMARY KEY, major_id INTEGER, name TEXT NOT NULL, FOREIGN KEY(major_id) REFERENCES Major(major_id));"
db.run(sql);

//Students
sql = "CREATE TABLE Students (studentid INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, major_id INTEGER, language INTEGER, FOREIGN KEY(major_id) REFERENCES Major(major_id));"
db.run(sql);


//course registration
sql = "CREATE TABLE CourseRegistration (studentid INTEGER, course_id INTEGER, PRIMARY KEY(studentid, course_id), FOREIGN KEY(studentid) REFERENCES Students(studentid), FOREIGN KEY(course_id) REFERENCES Courses(course_id));"
db.run(sql);

//student matches 
sql = "CREATE TABLE StudentsMatch (match_id INTEGER PRIMARY KEY, studentid1 INTEGER, studentid2 INTEGER, studentid3 INTEGER, FOREIGN KEY(studentid1) REFERENCES Students(studentid), FOREIGN KEY(studentid2) REFERENCES Students(studentid), FOREIGN KEY(studentid3) REFERENCES Students(studentid));"
db.run(sql);