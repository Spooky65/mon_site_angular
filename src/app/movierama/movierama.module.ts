import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MovieramaComponent } from './movierama.component';
import { HtmlLoaderService } from './html-loader.service';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    HttpClientModule, PickerModule,
    // ...
  ],
  providers: [HttpClient,HttpClientModule, HtmlLoaderService],
})
export class MovieramaModule { }
