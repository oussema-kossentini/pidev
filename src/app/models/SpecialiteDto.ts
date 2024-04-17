export class SpecialiteDto {
  title: string;       // The title of the speciality
  classes: string[];   // An array of class names associated with this speciality

  constructor(title: string, classes: string[]) {
    this.title = title;
    this.classes = classes;
  }
}
