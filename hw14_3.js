/*Створити конструктор Група, яка має список студентів і методи для додавання, видалення студентів,
 а також одержання рейтингу студентів за відвідуваністю і успішністю.
*/
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

class Group {
    constructor(groupName) {
      this.groupName = groupName;
      this.students = [];
    }
  
    addStudent(student) {
      this.students.push(student);
    }
  
    removeStudent(firstName, lastName) {
      this.students = this.students.filter(student => student.firstName !== firstName || student.lastName !== lastName);
    }
  
    getRankingByAttendance(course) {
      return this.students
        .map(student => ({
          firstName: student.firstName,
          lastName: student.lastName,
          averageAttendance: student.getAverageAttendance(course)
        }))
        .sort((a, b) => b.averageAttendance - a.averageAttendance);
    }
  
    getRankingByGrade(course) {
      return this.students
        .map(student => ({
          firstName: student.firstName,
          lastName: student.lastName,
          averageGrade: student.getAverageGrade(course)
        }))
        .sort((a, b) => b.averageGrade - a.averageGrade);
    }
  
    getGroupInfo() {
      return {
        groupName: this.groupName,
        students: this.students.map(student => student.getStudentInfo())
      };
    }
  }
  
  const student1 = new Student('Ivan', 'Ivanov', 2003);
  student1.addCourse('JS Basic');
  student1.addGrade('JS Basic', 100);
  student1.addGrade('JS Basic', 78);
  student1.addAttendance('JS Basic', true);
  student1.addAttendance('JS Basic', false);
  
  const student2 = new Student('Petr', 'Petrov', 2002);
  student2.addCourse('JS Basic');
  student2.addGrade('JS Basic', 85);
  student2.addGrade('JS Basic', 90);
  student2.addAttendance('JS Basic', true);
  student2.addAttendance('JS Basic', true);
  
  const group = new Group('Web Developers');
  group.addStudent(student1);
  group.addStudent(student2);
  
  console.log(group.getGroupInfo());
  console.log('Ranking by Attendance:', group.getRankingByAttendance('JS Basic'));
  console.log('Ranking by Grade:', group.getRankingByGrade('JS Basic'));
  
  group.removeStudent('Ivan', 'Ivanov');
  console.log(group.getGroupInfo());