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
  hoverTimeout: any = null;
  videoData = signal<any[]>([]);
  hoveredVideoId = signal<string | null>(null)
  genres = signal<{ [key: string]: any[] }>({});
  currentBackgroundVideo = signal<any | null>(null);
  startedVideos = signal<any[]>([]);
  viewedVideos = signal<any[]>([]);

  constructor() { 
    this.getVideoData();
  }


  getVideoData(){
      this.http.get<any[]>('http://127.0.0.1:8000/videoflix/api/videos/')
      .subscribe(data => {
          this.videoData.set(data);
          console.log(this.videoData());
          this.mapGenres(this.videoData());
          this.playRandomBackgroundVideo();
          this.filterIfStarted();
          this.filterIfViewved()
      });
  }


  filterIfStarted() {
    let startedVideos =  this.videoData().filter(video => video.user_progress !== null && video.user_progress.last_viewed_position != 0 && video.user_progress.viewed === false);
    this.startedVideos.set(startedVideos);
    
  }

  filterIfViewved() {
    let viewedVideos =  this.videoData().filter(video => video.user_progress !== null && video.user_progress.viewed === true);
    this.viewedVideos.set(viewedVideos);
  }
  

  mapGenres(videos: any[]): void {
    const genreMap: { [key: string]: any[] } = {};
    videos.forEach(video => {
      const genre = video.genre;
      if (!genreMap[genre]) {
        genreMap[genre] = [];
      }
      genreMap[genre].push(video);
    });
    this.genres.set(genreMap);
  }

  onMouseEnter(videoId: string, listType: string): void {
    const uniqueKey = `${videoId}-${listType}`;
    if (this.hoveredVideoId() === uniqueKey) return;

    // Start a timeout to delay video preview
    this.hoverTimeout = setTimeout(() => {
        this.hoveredVideoId.set(uniqueKey);
    }, 500); // Adjust delay (500ms = 0.5 seconds)
}
  

onMouseLeave(): void {
  clearTimeout(this.hoverTimeout);
  this.hoveredVideoId.set(null);
}  

  onVideoLoaded(videoPlayer: HTMLVideoElement, videoId: string, listType: string): void {
    const uniqueKey = `${videoId}-${listType}`;
    if (this.hoveredVideoId() === uniqueKey && videoPlayer && document.contains(videoPlayer)) {
      videoPlayer.currentTime = 0;
      videoPlayer.play().catch(error => console.warn("Video play interrupted:", error));
    }
  }

  checkVideoTime(videoPlayer: HTMLVideoElement): void {
    if (videoPlayer.currentTime >= 5) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }

  public getGenreKeys(): string[] {
    return Object.keys(this.genres());
  }


  playRandomBackgroundVideo(): void {
    const videos = this.videoData();
    if (!videos.length) return;
    const randomIndex = Math.floor(Math.random() * videos.length);
    this.currentBackgroundVideo.set(videos[randomIndex]);
  }
  

  onBackgroundVideoEnded(): void {
    this.playRandomBackgroundVideo(); 
  }

  selectVideo(videoId: number): void {
    this.currentVideo.set(videoId);
    console.log(this.currentVideo());
    document.body.classList.add('no-scroll');
  }


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
    this.getVideoData();
  }

  onTouchStart(videoId: string, listType: string): void {
    this.hoverTimeout = setTimeout(() => {
        this.hoveredVideoId.set(`${videoId}-${listType}`);
    }, 500);
  }

  onTouchEnd(): void {
      clearTimeout(this.hoverTimeout);
      this.hoveredVideoId.set(null);
  }

}
