import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,MatCardModule, MatButtonModule,MatGridListModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  title = 'index';
  cards = [
    {
      title: 'CV',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      href: 'cv',
      img: 'assets/img/cv_miniature.jpg'
    },
    {
      title: 'Pixel Idle',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      href: 'pixel',
      img: 'assets/img/pixel_miniature.jpg'
    },
    {
      title: 'Movierama',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      href: 'movierama',
      img: 'assets/img/movierama_api_miniature.png'
    },
    {
      title: 'Timer',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      href: 'timer',
      img: 'assets/img/timer_miniature.webp'
    },
  
  ];
}
