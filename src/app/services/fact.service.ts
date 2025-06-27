import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Response {
  fact: string,
  length: number
}

@Injectable({
  providedIn: 'root'
})
export class FactService {

  private http = inject(HttpClient);
  private apiURL = "https://catfact.ninja"

  getFact(): Observable<Response> {
    return this.http.get<Response>(this.apiURL+'/fact');
  }

}
