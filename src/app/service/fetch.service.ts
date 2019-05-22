import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as dbActions from '../util/database.js';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  wordsArray: BehaviorSubject<[]> = new BehaviorSubject(null);
  progress: string = '';

  constructor(private http: HttpClient) { }

  fetchData() {
    this.progress = 'Fetching data...';
    dbActions.createTables();
    const affiliate = this.http.get(`${environment.apiUrl}affiliate`);
    const marketing = this.http.get(`${environment.apiUrl}marketing`);
    const influencer = this.http.get(`${environment.apiUrl}influencer`);
    forkJoin([affiliate, marketing, influencer])
      .pipe(delay(3000))
      .subscribe(results => {
        let newArray = Object.values(results);
        for (let i in newArray) {
          this.passDataToQuery(newArray[i], dbActions.tables[i]);
        }
        this.progress = 'Loading successful';
      });
  }

  passDataToQuery(array, table) {
    array.forEach(element => {
      dbActions.insertToDB(table, element.word);
    });
  }

  getAllWords = async () => {
    const data = await dbActions.retreiveData();
    this.wordsArray.next(data);
  }


}
