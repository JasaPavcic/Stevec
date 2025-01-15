import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {

  start: boolean = false;
  timer: any;
  seconds: number = 0;
  timeTracked = this.timeTrackedFormat(this.seconds);
  startTime: any;


  timerStart() {
    this.start = true;
    this.timer = setInterval(() => {
      this.seconds++;
    },1000);
  }

  timerStop(): number {
    clearInterval(this.timer);
    this.start = false;
    const timeTracked = this.seconds;
    this.seconds = 0;
    return timeTracked;
}

  timeTrackedFormat(seconds: number): string {
    let minutes = 0;
    let hours = 0;
    while (seconds >= 3600) {
        seconds -= 3600;
        hours++;
    }
    while (seconds >= 60) {
        seconds -= 60;
        minutes++;
    }
    return ((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
}

}
