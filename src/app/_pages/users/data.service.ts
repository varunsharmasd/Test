import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Data } from '../../_state/users/users-store';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  loadData(){
    return this.http.get<{users:Data[]}>('https://dummyjson.com/users');
  }
}
