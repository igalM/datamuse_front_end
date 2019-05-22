import { Component, OnInit } from '@angular/core';
import { FetchService } from '../service/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  words: [] = [];
  constructor(private fetchService: FetchService) {
    this.fetchService.wordsArray.subscribe(data => {
      if (data) this.words = data;
    });
  }

  ngOnInit() {

  }

}
