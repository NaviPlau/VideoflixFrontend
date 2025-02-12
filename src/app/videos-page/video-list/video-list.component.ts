import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { HorizontalDirectivesDirective } from '../../shared/directives/horizontal-directives.directive';
import { VideoServiceService } from '../../shared/services/video-service/video-service.service';
import { HttpsService } from '../../shared/services/https-service/https.service';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule, HorizontalDirectivesDirective],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
  standalone: true,
})
export class VideoListComponent implements  OnInit{
  videoService = inject(VideoServiceService);
  http = inject(HttpsService);
  videoData = signal<any[]>([]);
  hoveredVideoId = signal<string | null>(null)
  genres = signal<{ [key: string]: any[] }>({});
  currentBackgroundVideo = signal<any | null>(null);
  startedVideos = signal<any[]>([]);
  viewedVideos = signal<any[]>([]);

  ngOnInit(): void {
    if (this.videoData().length === 0) { 
        this.http.get<any[]>('http://127.0.0.1:8000/videoflix/api/videos/')
        .subscribe(data => {
            this.videoData.set(data);
            console.log(this.videoData());
            this.mapGenres(this.videoData());
            this.playRandomBackgroundVideo();
            this.filterIfStarted();
            this.filterIfViewved()
        });
    } else {
        console.log("Using cached video data");  
        this.mapGenres(this.videoData());
        this.playRandomBackgroundVideo();
        this.filterIfStarted();
        this.filterIfViewved()
    }
}

  filterIfStarted() {
    let startedVideos =  this.videoData().filter(video => video.user_progress !== null && video.user_progress.last_viewed_position != 0);
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

  onMouseEnter(videoId: string): void {
    this.hoveredVideoId.set(videoId); 
  }

  onMouseLeave(): void {
    this.hoveredVideoId.set(null);
  }

  onVideoLoaded(videoPlayer: HTMLVideoElement): void {
    videoPlayer.currentTime = 0; 
    videoPlayer.play();
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
    this.videoService.currentVideo.set(videoId);
    console.log(this.videoService.currentVideo());
    
  }


}
