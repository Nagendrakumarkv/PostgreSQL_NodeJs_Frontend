import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [CommonModule],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
