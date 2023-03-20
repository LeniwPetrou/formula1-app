import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  baseUrl: string = `${environment.apiBaseUrl}`;
  filterForm: FormGroup;

  constructor(
    private http: HttpClient
  ) { }

  initializeFilterForm() {
    this.filterForm = new FormGroup({
      season: new FormControl('', Validators.required),
      race: new FormControl('', Validators.required)
    });
    return this.filterForm ;
  }

  getSeasons(){
    return this.http.get<any>(`${this.baseUrl}/seasons.json`, {responseType: 'json'})
  }

  getRaces(season){
    return this.http.get<any>(`${this.baseUrl}/${season}.json`, {responseType: 'json'})
  }

  getResults(season, race, pageSize: number, pageIndex: number){
    return this.http.get<any>(`${this.baseUrl}/${season}/${race}/results.json?limit=${pageSize}&offset=${pageIndex * pageSize}`, {responseType: 'json'})
  }
}
