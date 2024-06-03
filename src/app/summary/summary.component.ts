import { Component, HostListener, inject } from '@angular/core';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';
import { SessiondataService } from '../services/sessiondata.service';
import { Task } from '../interfaces/task.interface';
import { GreetingAnimationComponent } from '../greeting-animation/greeting-animation.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    CommonModule,
    GreetingAnimationComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  
  _subscriptionUser: any;
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };
  setImg = false;
  name = '';
  greeting = 'Hello';
  date = '';
  currentTimestamp = 0;
  nrOfTasks = [
    {
      status: 'toDo',
      amount: 0,
    },
    {
      status: 'inProgress',
      amount: 0,
    },
    {
      status: 'awaitFeedback',
      amount: 0,
    },
    {
      status: 'done',
      amount: 0,
    },
  ];

  taskHighestPriorityArray: Task[] = [];
  deadline = '';
  mobileMode = false;
  

  nrTasksInBoard = 0;
  nrTasksUrgent = 0;

  penImgSrc = [
    '../../assets/img/pencil-dark.svg',
    '../../assets/img/pencil-white-r.svg',
  ];
  doneImgSrc = [
    '../../assets/img/done-dark.svg',
    '../../assets/img/done-white.svg',
  ];
  penImgIdx = 0;
  doneImgIdx = 0;

  sessionDataService = inject(SessiondataService);

  constructor(private userService: UserdataService) {
    if (this.userService.loadDataFromSessionStoarage('name') !== 'guest')
      this.name = this.userService.loadDataFromSessionStoarage('name');

    this.greeting = this.greetingDay(this.name);
  }

  ngOnInit() {
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;

        if (user) {
          this.nrOfTasks.forEach((element) => {
            element.amount = this.countTasksOfStatus(element.status);
          });
          this.nrTasksInBoard = this.countAllTasks();
          this.getHighestPriority();
          this.deadline = this.getDeadline();
        }
      }
    );
    this.checkMobile();
    this.mobileGreeting();
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

  changeImg(name: 'pencil' | 'done') {
    name === 'pencil' ? (this.penImgIdx = 1) : (this.doneImgIdx = 1);
  }

  resetImg(name: 'pencil' | 'done') {
    name === 'pencil' ? (this.penImgIdx = 0) : (this.doneImgIdx = 0);
  }

  greetingDay(name: string): string {
    const currentTime = new Date();
    this.getFullDate(currentTime);

    const currentHour = currentTime.getHours();

    let letter = name == '' ? '!' : ',';

    if (currentHour < 12) {
      return 'Good morning' + letter;
    } else if (currentHour < 18) {
      return 'Good day' + letter;
    } else {
      return 'Good evening' + letter;
    }
  }

  getFullDate(time: Date) {
    let date = time.toISOString();
    date = date.slice(0, 10);
    this.currentTimestamp = Date.parse(date);
  }

  getTimestamp(time: string): number {
    let date = time.slice(0, 10);
    return Date.parse(date);
  }

  /**
   *
   * @param status
   * @returns
   */
  countTasksOfStatus(status: string): number {
    let num = 0;
    if (this.localUser.tasks) {
      this.localUser.tasks.forEach((task) => {
        if (task.status === status) num++;
      });
    }
    return num;
  }

  /**
   *
   * @returns
   */
  countAllTasks(): number {
    let num = 0;
    if (this.localUser.tasks) {
      this.localUser.tasks.forEach((task) => {
        num++;
      });
    }
    return num;
  }

  /**
   * Search all task for highest Priority
   */
  getHighestPriority() {
    if (this.localUser.tasks) {
      this.localUser.tasks.forEach((task) => {
        if (task.priority === 'urgent') {
          this.taskHighestPriorityArray.push(task);
        }
      });
    }
  }

  getDeadline() {
    let difference = 99999999999999;
    let date = '';

    this.taskHighestPriorityArray.forEach((task) => {
      if (
        difference >=
        this.getTimestamp(task.dueDate) - this.currentTimestamp
      ) {
        difference = this.getTimestamp(task.dueDate) - this.currentTimestamp;
        date = task.dueDate;
      }
    });
    let newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.checkMobile();
  }

  checkMobile() {
    let width = window.innerWidth;
    this.mobileMode = width <= 1200 ? true : false;
  }

  mobileGreeting() {
    if (this.mobileMode && this.sessionDataService.fadeout == 'show') {
      setTimeout(() => {
        this.sessionDataService.fadeout = 'hide';
      }, 1500);
    }
    console.log(this.sessionDataService.fadeout);
    
  }
}
