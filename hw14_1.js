/*Вам необхідно створити конструктор Студента, у якого мають бути властивості: ім'я, прізвище, рік народження, оцінки, відвідуваність,
 курс. Кількість оцінок і відвіданих занять залежить від курсу, на якому займається студент. Так само у Студента є методи:
  додати оцінку, додати відвідування, отримати середню успішність, отримати середнє відвідування, отримати кількість пройдених занять,
   змінити курс (мають оновитися дані про курс), а також отримати всю інформацію про студента.
*/
class Student {
    constructor(firstName, lastName, birthYear, course) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.grades = [];
        this.attendance = [];
        this.course = course;
    }

addGrade(grade) {
    this.grades.push(grade);
  }

  addAttendance(isPresent) {
    this.attendance.push(isPresent);
  }

  getAverageGrade() {
    if (this.grades.length === 0) return 0;
    const total = this.grades.reduce((acc, grade) => acc + grade, 0);
    return total / this.grades.length;
  }

  getAverageAttendance() {
    if (this.attendance.length === 0) return 0;
    const presentDays = this.attendance.filter(day => day).length;
    return presentDays / this.attendance.length;
  }

  getTotalClasses() {
    return this.attendance.length;
  }

  changeCourse(newCourse) {
    this.course = newCourse;
    this.grades = [];
    this.attendance = [];
  }

  getStudentInfo() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthYear: this.birthYear,
      course: this.course,
      averageGrade: this.getAverageGrade(),
      averageAttendance: this.getAverageAttendance(),
      totalClasses: this.getTotalClasses(),
    };
  }
}

  const student1 = new Student('Ivan', 'Ivanov', 2003, 4);
  student1.addGrade(100);
  student1.addGrade(78);
  student1.addAttendance(true);
  student1.addAttendance(false);
  
  console.log(student1.getStudentInfo());
  
  student1.changeCourse(5);
  console.log(student1.getStudentInfo());
