import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xgenrap CheckList:';
  messages = this.http.get<any[]>('http://localhost:4201');
  times =  this.http.get<any[]>('http://localhost:4201/time');

  constructor(private http: HttpClient) { }

  post() {
    this.http.post<any>('http://localhost:4201/users', {username: 'Claude', password: 'Claude'})
    .subscribe(next => console.log(next));
  }
}
