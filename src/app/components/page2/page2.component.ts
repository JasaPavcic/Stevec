import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-page2',
  imports: [],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component {
  
  username: string | null = '';
    currentPage: string = '';
    user: User | null = null;
    timeTracked: number | null = null;
  
    constructor(private userService: UserService, private timer: TimeTrackingService){
      
    }
  
    ngOnInit(): void {
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
        this.user.timeSpent.page2 = this.user.timeSpent.page2 + this.timeTracked;
        this.userService.saveUser(this.user);
      } else {
        console.log('Ne najdem userja');
      }
      console.log('preživet čas na strani:', this.timeTracked);
      console.log('uporabnik:',this.user);
      
    }

}
