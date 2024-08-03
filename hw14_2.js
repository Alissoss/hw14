//Додати Студенту можливість навчатися на кількох курсах з можливістю додавання і видалення курсу.
class Student {
    constructor(firstName, lastName, birthYear) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthYear = birthYear;
      this.courses = {};
    }
  
    addCourse(course) {
      if (!this.courses[course]) {
        this.courses[course] = { grades: [], attendance: [] };
      } else {
        console.log(`Студент вже проходить ${course}.`);
      }
    }
  
    removeCourse(course) {
      if (this.courses[course]) {
        delete this.courses[course];
      } else {
        console.log(`Курс ${course} не знайдено.`);
      }
    }
  
    addGrade(course, grade) {
      if (this.courses[course]) {
        this.courses[course].grades.push(grade);
      } else {
        console.log(`Курс ${course} не знайдено.`);
      }
    }
  
    addAttendance(course, isPresent) {
      if (this.courses[course]) {
        this.courses[course].attendance.push(isPresent);
      } else {
        console.log(`Курс ${course} не знайдено.`);
      }
    }
  
    getAverageGrade(course) {
      if (!this.courses[course] || this.courses[course].grades.length === 0) return 0;
      const total = this.courses[course].grades.reduce((acc, grade) => acc + grade, 0);
      return total / this.courses[course].grades.length;
    }
  
    getAverageAttendance(course) {
      if (!this.courses[course] || this.courses[course].attendance.length === 0) return 0;
      const presentDays = this.courses[course].attendance.filter(day => day).length;
      return presentDays / this.courses[course].attendance.length;
    }
  
    getTotalClasses(course) {
      return this.courses[course] ? this.courses[course].attendance.length : 0;
    }
  
    getStudentInfo() {
      let info = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthYear: this.birthYear,
        courses: {}
      };
  
      for (const course in this.courses) {
        info.courses[course] = {
          averageGrade: this.getAverageGrade(course),
          averageAttendance: this.getAverageAttendance(course),
          totalClasses: this.getTotalClasses(course),
        };
      }
  
      return info;
    }
  }
  
  const student1 = new Student('Ivan', 'Ivanov', 2003);
  student1.addCourse('JS Basic');
  student1.addGrade('JS Basic', 100);
  student1.addGrade('JS Basic', 78);
  student1.addAttendance('JS Basic', true);
  student1.addAttendance('JS Basic', false);
  console.log(student1.getStudentInfo());
  
  student1.addCourse('TS');
  student1.addGrade('TS', 85);
  student1.addAttendance('TS', true);
  console.log(student1.getStudentInfo());
  
  student1.removeCourse('JS Basic');
  console.log(student1.getStudentInfo());
  