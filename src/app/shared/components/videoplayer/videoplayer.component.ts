import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Hls from 'hls.js';
import { VideoServiceService } from '../../services/video-service/video-service.service';
import { MatIcon } from '@angular/material/icon';
import { HttpsService } from '../../services/https-service/https.service';

@Component({
  selector: 'app-videoplayer',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayerFull', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  http = inject(HttpsService);
  videoService = inject(VideoServiceService);
  availableQualities: { level: number; label: string }[] = [];
  currentQuality: number = -1;
  hls: Hls | null = null;

  isLoading: boolean = true;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  currentVolume: number = 0.5; 
  progress: number = 0;
  controlsVisible: boolean = true;
  isFullscreen: boolean = false;
  controlsHideTimeout: any;

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }


  ngAfterViewInit(): void {
    this.setupControlVisibility();
    this.setupFullscreenListener();
    this.fetchAndPlayVideo();
  }

  fetchAndPlayVideo(): void {
    if (this.videoService.currentVideo() === null) return;
    const apiUrl = `http://127.0.0.1:8000/videoflix/api/videos/${this.videoService.currentVideo()}/`;
    
    this.http.get(apiUrl).subscribe((data: any) => {
      if (data.hls_master_playlist_url) {
        this.initHlsPlayer(data.hls_master_playlist_url, data.user_progress?.last_viewed_position);
      } else {
        console.error('HLS master playlist URL is missing in the response.');
      }
    });
  }
  
  initHlsPlayer(playlistUrl: string, lastViewedPosition?: number): void {
    if (Hls.isSupported()) {
      this.hls = new Hls({
        enableWorker: true,
        abrEwmaFastLive: 2.0,
        abrEwmaSlowLive: 5.0,
        abrMaxWithRealBitrate: true,
      });
  
      this.hls.loadSource(playlistUrl);
      this.hls.attachMedia(this.videoElement.nativeElement);
  
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.availableQualities = this.hls?.levels.map((level: any, index: number) => ({
          level: index,
          label: `${level.height}p`,
        })) || [];
  
        if (lastViewedPosition && lastViewedPosition > 0) {
          this.videoElement.nativeElement.currentTime = lastViewedPosition;
        }
  
        this.videoElement.nativeElement.play();
        this.isPlaying = true;
        this.isLoading = false;
      });
  
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.details === 'bufferStalledError') {
          console.warn('Buffer stalled due to low network speed.');
        }
      });
    } else {
      this.videoElement.nativeElement.src = playlistUrl;
      if (lastViewedPosition && lastViewedPosition > 0) {
        this.videoElement.nativeElement.currentTime = lastViewedPosition;
      }
      this.videoElement.nativeElement.play();
    }
  }
  

  togglePlay(): void {
    if (!this.videoElement || !this.videoElement.nativeElement) {
      console.warn('Video element is not available yet.');
      return;
    }
  
    const video = this.videoElement.nativeElement;
    if (video.paused || video.ended) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleMute(): void {
    const video = this.videoElement.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

  changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.currentVolume = parseFloat(input.value);
    const video = this.videoElement.nativeElement;
    video.volume = this.currentVolume;
    if (this.currentVolume === 0) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
  }

  updateProgress(): void {
    const video = this.videoElement.nativeElement;
    this.progress = (video.currentTime / video.duration) * 100;
    let adjustedPosition = Math.max(0, video.currentTime - 1);
    this.videoService.currentProgress.set(adjustedPosition);
    this.videoService.videoDuration.set(video.duration);
    if (video.ended) {
        setTimeout(() => {
            video.currentTime = 0;
            video.play();
        }, 5000); 
    }
}

  seek(event: MouseEvent): void {
    const video = this.videoElement.nativeElement;
    const progressBar = event.currentTarget as HTMLElement;
    const clickPosition = event.offsetX / progressBar.clientWidth;
    video.currentTime = clickPosition * video.duration;
    this.updateProgress();
  }

  changeQuality(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const level = parseInt(selectElement.value, 10);

    if (!isNaN(level) && this.hls) {
      const currentTime = this.videoElement.nativeElement.currentTime;
      this.videoElement.nativeElement.pause();

      this.hls.currentLevel = level;

      this.hls.once(Hls.Events.LEVEL_SWITCHED, () => {
        this.videoElement.nativeElement.currentTime = currentTime;
        this.videoElement.nativeElement.play();
        this.isPlaying = true;
      });
    }
  }

  toggleFullscreen(): void {
    const videoContainer = this.videoElement.nativeElement.parentElement;
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  showControls(): void {
    this.controlsVisible = true;
    clearTimeout(this.controlsHideTimeout);
    this.controlsHideTimeout = setTimeout(() => {
      this.controlsVisible = false;
    }, 1500); 
  }

  setupFullscreenListener(): void {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  setupControlVisibility(): void {
    this.videoElement.nativeElement.addEventListener('mousemove', () => this.showControls());
  }

  closeVideo(): void {
    this.videoService.saveUserProgress();
    this.videoElement.nativeElement.pause();
    
    setTimeout(() => {
      this.videoService.currentVideo.set(null);
      
    }, 200);
  }
}


