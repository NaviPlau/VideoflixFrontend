import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent implements  OnInit{
  private http = inject(HttpClient);
  videoData = signal<any[]>([]);
  hoveredVideoId = signal<string | null>(null)

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/videoflix/api/videos/')
      .subscribe(data => this.videoData.set(data));
      setTimeout(() => {
        console.log(this.videoData());
        
      }, 2000);
      
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

}
