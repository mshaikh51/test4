const Sequelize = require("sequelize");
var sequelize = new Sequelize(
  "psqxicbk",
  "psqxicbk",
  "hB1oIZlVwbGA4jvuszwyyhm-UJrEGeFz",
  {
    host: "heffalump.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

var Student = sequelize.define("Student", {
  StudId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  program: Sequelize.STRING,
  gpa: Sequelize.FLOAT,
});

var fs = require("fs");

var students = [];

exports.prep = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(function () {
        resolve();
      })
      .catch(function (params) {
        reject("unable to sync the database");
      });
  });
};

exports.addStudent = (stud) => {
  return new Promise((resolve, reject) => {
    Student.create(stud)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("unable to add the student");
      });
  });
};

exports.cpa = () => {
  return new Promise((resolve, reject) => {
    Student.findAll({ where: { program: "CPA" } })
      .then((data) => {
      //  console.log("cpa");
        //console.log(data);
        resolve(data);
      }).catch(function () {
        
      reject("no results returned");
      })

  });
};

exports.highGPA = () => {
  return new Promise((resolve, reject) => {
    Student.findAll({
    }).then(function (data) {
      let high = 0;

      let highStudent;

      let students=data;
      for (let i=0; i<students.length; i++)

      {

          //console.log(students[i].gpa, high);

          if (students[i].gpa > high)

          {

              high = students[i].gpa;

              highStudent = students[i];

          }

      }

      (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
      }).catch(function () {
        reject("no results returned");
      });
  });
};
exports.allStudents = () => {
  return new Promise((resolve, reject) => {
    Student.findAll()
      .then(function (data) {
        resolve(data);
      })
      .catch(function () {
        reject("no results returned");
      });
  });
};
/*
exports.bsd = () => {
  return new Promise((resolve, reject) => {
    let results = students.filter((student) => student.program == "BSD");

    results.length == 0 ? reject("No BSD students.") : resolve(results);
  });
};

exports.lowGPA = () => {
  return new Promise((resolve, reject) => {
    let low = 4.0;

    let lowStudent;

    for (let i = 0; i < students.length; i++) {
      if (students[i].gpa < low) {
        low = students[i].gpa;

        lowStudent = students[i];
      }
    }

    resolve(lowStudent);
  });
};



exports.getStudent = (studId) => {
  return new Promise((resolve, reject) => {
    students.forEach(function (student) {
      if (student.studId == studId) resolve(student);
    });

    reject("No result found!");
  });
};
*/