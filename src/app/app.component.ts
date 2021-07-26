import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xgenrap CheckList:';
  messages = this.http.get<any[]>('http://localhost:4201');
  times =  this.http.get<any[]>('http://localhost:4201/time');
  currentUser: User;

  constructor(private http: HttpClient,
              private router: Router,
              private authenticationService: AuthenticationService) { 
                this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
              }

  post() {
    this.http.post<any>('http://localhost:4201/users', {username: 'Claude', password: 'Claude'})
    .subscribe(next => console.log(next));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
