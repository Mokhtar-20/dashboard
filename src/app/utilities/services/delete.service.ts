import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  apiURL = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  delete(url:string, id: any){
    return this._httpClient.delete(this.apiURL + url + '/' + id)
  }
}
