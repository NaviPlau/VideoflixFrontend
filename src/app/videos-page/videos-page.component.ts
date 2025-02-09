import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { VideoplayerComponent } from "../shared/components/videoplayer/videoplayer.component";
import { VideoListComponent } from "./video-list/video-list.component";

@Component({
  selector: 'app-videos-page',
  imports: [HeaderComponent, FooterComponent, VideoplayerComponent, VideoListComponent],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss'
})
export class VideosPageComponent {
  
}
