import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PostFormComponent {
  post = { title: '', content: '', userId: 1 }; // Default userId for testing

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.createPost(this.post).subscribe({
      next: (post) => {
        alert('Post created successfully!');
        this.post = { title: '', content: '', userId: 1 };
      },
      error: (err) => alert('Error creating post: ' + err.message),
    });
  }
}
