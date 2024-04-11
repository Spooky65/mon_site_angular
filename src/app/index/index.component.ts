import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,MatCardModule, MatButtonModule,MatGridListModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  title = 'index';
  cards = [
    {
      title: 'CV',
      description: 'Retrouver ici un aperçu de mon CV au format téléchargeable et imprimable.',
      href: 'cv',
      img: 'assets/img/cv_miniature.jpg'
    },
    {
      title: 'Pixel Idle',
      description: 'Idle game de click sur le thème des pixels.',
      href: 'pixel',
      img: 'assets/img/pixel_miniature.jpg'
    },
    {
      title: 'Movierama',
      description: 'Recherche des informations sur un film avec une API externe (OMDb).',
      href: 'movierama',
      img: 'assets/img/movierama_api_miniature.png'
    },
    {
      title: 'Timer',
      description: 'Permet de concentrer son temps sur le web, grace un onglet éphémère et limité dans le temps.',
      href: 'timer',
      img: 'assets/img/timer_miniature.webp'
    },
  
  ];
}
