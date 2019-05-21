import { Component, OnInit } from '@angular/core';
import { FetchService } from '../service/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fetchService: FetchService) {
  }

  ngOnInit() {

  }

}
