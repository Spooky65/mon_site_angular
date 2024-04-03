import { Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { IndexComponent } from './index/index.component';
import { PixelComponent } from './pixel/pixel.component';
import { MovieramaComponent } from './movierama/movierama.component';
import { TimerComponent } from './timer/timer.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: IndexComponent },
    { path: 'cv', component: CvComponent },
    { path: 'pixel', component: PixelComponent },
    { path: 'movierama', component: MovieramaComponent },
    { path: 'timer', component: TimerComponent },
];
