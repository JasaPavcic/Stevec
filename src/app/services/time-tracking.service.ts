import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  milliseconds = 0;
  timeTracked = 0;
  private intervalSubscription: Subscription | null = null;
  private timeSubject = new BehaviorSubject<number>(0);

  timerStart() {
    this.intervalSubscription = interval(10).subscribe(() => {
      this.milliseconds += 10;
      this.timeSubject.next(this.milliseconds);
    });
  }

  timerStop(): number {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    const timeTracked = this.milliseconds;
    this.milliseconds = 0;
    return Math.round((timeTracked / 1000) * 100) / 100;
  }

  getTimeUpdates() {
    return this.timeSubject.asObservable(); 
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
