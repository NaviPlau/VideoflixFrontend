import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";

@Component({
  selector: 'app-videos-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss'
})
export class VideosPageComponent {

}
