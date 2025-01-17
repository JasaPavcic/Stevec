import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TimeTrackingService } from '../../services/time-tracking.service';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent{

  username: string | null = '';
  user: User | null = null;
  timeTracked: number | null = null;

  constructor(private userService: UserService, private timer: TimeTrackingService){}

  ngOnInit(){
    this.username = this.userService.getUsername();
    this.timer.timerStart();

    if (this.username){
      this.user = this.userService.getUser(this.username);
    } else {
      console.log('Ne najdem username-a');
    }
  }

  ngOnDestroy() {
    this.timeTracked = this.timer.timerStop();
    if (this.user) {
      this.user.timeSpent.stats = this.user.timeSpent.stats + this.timeTracked;
      this.userService.saveUser(this.user);
    } else {
      console.log('Ne najdem userja');
    }
    console.log('preživet čas na strani:', this.timeTracked);
    console.log('uporabnik:',this.user);
    
  }
}
