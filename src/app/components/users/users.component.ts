import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
