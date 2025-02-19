import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }
  
  submit(url: string, formData?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    let object: any = {};
    formData.forEach((value: any, key: any) => object[key] = value);
    const body = JSON.stringify(object);
    return this._httpClient.post<any>(this.apiURL + url, body, { headers: headers }).pipe(
      (data) => data,
      (error) => error
    );
  }

  put(url:string, id:any ,formData?: any) {
    return this._httpClient.put<any>(this.apiURL + url + '/' + id, formData).pipe(
      (data) => data,
      (error) => error
    );
  }
}
