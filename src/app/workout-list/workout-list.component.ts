import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WorkoutListComponent implements OnInit {
  userData: any[] = [];
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }

  saveUserData() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      let user = this.userData.find(u => u.name === this.userName);
      if (!user) {
        user = { id: this.userData.length + 1, name: this.userName, workouts: [] };
        this.userData.push(user);
      }
      user.workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
      this.saveUserData();
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}