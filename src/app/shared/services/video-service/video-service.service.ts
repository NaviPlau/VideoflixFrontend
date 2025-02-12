import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { HttpsService } from '../https-service/https.service';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  currentVideo = signal<number|null>( null) ;
  authService = inject(AuthService)
  http= inject(HttpsService)
  currentProgress = signal<number>(0)
  videoDuration = signal<number>(0)
  constructor() { }


  saveUserProgress(): void {
    let apiUrl = `http://127.0.0.1:8000/videoflix/api/video/${this.currentVideo()}/progress/`;
  
    let isFullyWatched = this.currentProgress() >= this.videoDuration() -2;
    let payload = {
      last_viewed_position: isFullyWatched ? 0 : this.currentProgress(),
      viewed: isFullyWatched
    };
  
    this.http.patch(apiUrl, payload).subscribe(
      response => console.log('Success:', response),
      error => console.error('Error:', error)
    );
  }

}
