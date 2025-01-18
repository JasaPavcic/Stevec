import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit,OnDestroy{

  username: string | null = '';
  user: User | null = null;
  timeTracked = 0;
  liveTime = 0;
  savedTime = 0;
  private timeSubscription: Subscription | null = null;

  constructor(private userService: UserService, private timer: TimeTrackingService){}

  ngOnInit(){

    this.username = this.userService.getUsername();
    this.timer.timerStart();
    

    if (this.username){
      this.user = this.userService.getUser(this.username);
      if(this.user)
        this.savedTime = this.user?.timeSpent.stats;
    } else {
      console.log('Ne najdem username-a');
    }

    this.timeSubscription = this.timer.getTimeUpdates().subscribe((time) => {
      this.liveTime = Math.round((time / 1000) * 100) / 100; // Convert to seconds
      if (this.user) {
        this.user.timeSpent.stats = (this.liveTime);
      }
    });

  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }

    this.timeTracked = this.timer.timerStop();


    if (this.user) {
      this.user.timeSpent.stats = this.timeTracked + this.savedTime;
      this.userService.saveUser(this.user);
    } else {
      console.log('Ne najdem userja');
    }
    console.log('preživet čas na strani:', this.timeTracked);
    console.log('uporabnik:',this.user);
    
  }

  formatTime(seconds: number): string {
    return this.timer.timeTrackedFormat(Math.round(seconds));
  }

  getTotalTime(): number {
    return Math.round((this.savedTime + this.liveTime)*1) / 1;
  }

  
}
