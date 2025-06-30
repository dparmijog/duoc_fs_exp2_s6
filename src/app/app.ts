import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Top } from './top/top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Top],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app';
}
