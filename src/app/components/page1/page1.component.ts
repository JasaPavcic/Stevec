import { Component} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { TimeTrackingService } from '../../services/time-tracking.service';

@Component({
  selector: 'app-page1',
  imports: [],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component {

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
      this.user.timeSpent.page1 = this.user.timeSpent.page1 + this.timeTracked;
      this.userService.saveUser(this.user);
    } else {
      console.log('Ne najdem userja');
    }
    console.log('preživet čas na strani:', this.timeTracked);
    console.log('uporabnik:',this.user);
    
  }
}
