import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-activate-content',
  imports: [CommonModule],
  templateUrl: './activate-content.component.html',
  styleUrl: './activate-content.component.scss'
})
export class ActivateContentComponent {
  loading = true;
  success: string | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid')!;
    const token = this.route.snapshot.paramMap.get('token')!;

    this.activateAccount(uid, token);
  }

  activateAccount(uid: string, token: string): void {
    this.http
      .get<{ message: string }>(`http://127.0.0.1:8000/videoflix/api/activate/${uid}/${token}/`)
      .subscribe({
        next: (response) => {
          this.success = response.message;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          this.error = error.error.error || 'Account activation failed.';
          this.loading = false;
        }
      });
  }
}

