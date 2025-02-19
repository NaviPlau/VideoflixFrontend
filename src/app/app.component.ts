import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from "./shared/components/toast-message/toast-message.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix';
}
