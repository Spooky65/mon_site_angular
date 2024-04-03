import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import $, { data } from 'jquery';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { MovieramaModule } from './movierama.module';
import { HtmlLoaderService } from './html-loader.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-movierama',
  standalone: true,
  imports: [CommonModule,MovieramaModule,CardComponent,FormsModule],
  templateUrl: './movierama.component.html',
  styleUrl: './movierama.component.css',
  providers: [HttpClient,HttpClientModule,HtmlLoaderService],
})
export class MovieramaComponent {
  public htmlContent: SafeHtml;
  movies: any;
  cardComponentInstance = new CardComponent();
  showComponent = false;

  constructor(private http: HttpClient,
    private htmlLoaderService: HtmlLoaderService,
    private sanitizer: DomSanitizer) { }

  // // Méthode pour effectuer un appel d'API
  // getData() {
  //   return this.http.get('https://api.example.com/data');
  // }
  response = null;
  title = "";
  // movies = {};
  search(title: string) {
    this.title = title;
    console.log(this.title);
    var path = "http://www.omdbapi.com/?s="+this.title+"&type=movie&apikey=16218600&r=json";
    var resultAll = this.http.get(path); 
    var content = resultAll.subscribe(
      (data) => {
        // console.log('Données de l\'API :', data);
        var resultat = Object.values(data);
        var film = [];
        var movies = [];
        if(resultat[0] == "False"){
          this.response = false;
          // $("htmlContent").html("<div>{{ "+movies+" | json }}</div>");
          // this.cardComponentInstance.response = false;
          // this.cardComponentInstance.title = title;
          // this.cardComponentInstance.movies = movies;
          $("htmlContent").html("<app-card [response]="+this.response+" [title]="+this.title+" [movies]="+this.movies+" ></app-card>");
        }else{
          this.response = true;
          // console.log('Données de l\'API :', resultat);
          resultat[0].forEach((element) => {
            // console.log(element);
            film = Object.values(element);
            path = "http://www.omdbapi.com/?i="+film[2]+"&type=movie&apikey=16218600&r=json";
            var result = this.http.get(path); 
            // console.log('Données de result :', result);
            var content = result.subscribe(
              (data2) => {
                movies.push(data2);
                console.log('Données de l\'API :', data2);
                this.movies = movies;
                // movies.push(data);
                // var movies = Object.values(data);
              },
              (error) => {
                console.error('Erreur lors de la récupération des données :', error);
              }
            );
          });
          console.log('Données de this.movies :', this.movies);
      
          // Attribuez la valeur de la variable film à
          // this.cardComponentInstance.response = true;
          // this.cardComponentInstance.title = title;
          // this.cardComponentInstance.movies = movies;
          // console.log($("htmlContent"));
          // $("htmlContent").html("<div>{{ "+movies+" | json }}</div>");
          // console.log($("htmlContent"));
          // console.log('cardComponentInstance de l\'API :', cardComponentInstance);  
        }
      },
      (error) => {
        var construct = { response: false, };
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  
  };
  // ngOnChanges() {
  //   $("htmlContent").html("<app-card></app-card>");
  // }
}
