import { Component, OnInit } from '@angular/core';
import { ApiService, Post, Comment } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  newComment: { [key: number]: { content: string; userId: number } } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
      posts.forEach((post) => {
        this.newComment[post.id] = { content: '', userId: 1 }; // Default userId
      });
    });
  }

  editPost(post: Post): void {
    const updated = { title: post.title, content: post.content };
    this.apiService.updatePost(post.id, updated).subscribe({
      next: () => this.loadPosts(),
      error: (err) => alert('Error updating post: ' + err.message),
    });
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService.deletePost(id).subscribe({
        next: () => this.loadPosts(),
        error: (err) => alert('Error deleting post: ' + err.message),
      });
    }
  }

  addComment(postId: number): void {
    const comment = this.newComment[postId];
    if (!comment.content) {
      alert('Comment content is required');
      return;
    }
    this.apiService.createComment({ ...comment, postId }).subscribe({
      next: () => {
        this.newComment[postId] = { content: '', userId: 1 };
        this.loadPosts();
      },
      error: (err) => alert('Error adding comment: ' + err.message),
    });
  }

  editComment(comment: Comment): void {
    this.apiService
      .updateComment(comment.id, { content: comment.content })
      .subscribe({
        next: () => this.loadPosts(),
        error: (err) => alert('Error updating comment: ' + err.message),
      });
  }

  deleteComment(id: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.apiService.deleteComment(id).subscribe({
        next: () => this.loadPosts(),
        error: (err) => alert('Error deleting comment: ' + err.message),
      });
    }
  }
}
