import {Component} from '@angular/core';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import * as jalaliMoment from 'jalali-moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/** https://github.com/fingerpich/jalali-moment#angular
 *
 * https://stackblitz.com/edit/angular-jalali-datepicker?file=app%2Fmat-core%2Fjalali_moment_formats.ts */
export class AppComponent {

  iranHoliday: Record<number, number[]> = {
    1: [1, 2, 3, 4, 12, 13],
    2: [],
    3: [14, 15],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [22],
    12: [29]
  };

  islamicHoliday: Record<number, number[]> = {
    1: [9, 10],
    2: [20, 28, 30],
    3: [8, 17],
    4: [],
    5: [],
    6: [3],
    7: [13, 27],
    8: [15],
    9: [21],
    10: [1, 2, 25],
    11: [],
    12: [10, 18]
  };

  dateClass: MatCalendarCellClassFunction<jalaliMoment.Moment> = (cellDate, view) => {
    if (view === 'month') {
      const jMonth = cellDate.jMonth() + 1;
      const jDate = cellDate.jDate();
      const jDay = cellDate.jDay() + 1;
      let iMonth: any, iDate: any;
      this.hijriDate(cellDate.toDate(), (year, month, day) => {
        iMonth = month;
        iDate = day;
      });
      if (this.iranHoliday[jMonth]?.includes(jDate) || jDay === 7 || this.islamicHoliday[+iMonth]?.includes(+iDate)) {
        return 'example-custom-date-class';
      }
    }
    return '';
  };


  hijriDate(date: Date, hijriDate: (year: string, month: string, day: string) => void): any {
    const myFormat: string = 'fa-u-ca-islamic-umalqura-nu-latn';
    const myDate: Date = new Date(date);
    const year: string = new Intl.DateTimeFormat(myFormat, {year: 'numeric'}).format(myDate).split(" ")[0];
    const month: string = new Intl.DateTimeFormat(myFormat, {month: 'numeric'}).format(myDate);
    const day: string = new Intl.DateTimeFormat(myFormat, {day: 'numeric'}).format(myDate);
    return hijriDate(year, month, day);
  }
}
