import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  apiURL = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this._httpClient.get(this.apiURL + url)
  }

  getSingle(url: string, id: any): Observable<any> {
    return this._httpClient.get(this.apiURL + url + '/' + id)
  }
}
