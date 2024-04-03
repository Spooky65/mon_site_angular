import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlLoaderService {
  constructor(private http: HttpClient) {}

  loadHtmlFile(url: string, data: object): Observable<object> {
    // return this.http.get(url, { responseType: 'text' });
    return this.http.post(url,data);
  }
}
