import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import { FilmService } from 'src/app/shared/films/films.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dropStatus = false;
  expandStatus = false;

  constructor(private authService: AuthService, private storage: DataStorageService, private filmService: FilmService) { }

  ngOnInit() {
  }

  onDropdown() {
   this.dropStatus = !this.dropStatus;
  }

  onExpand() {
    this.expandStatus = !this.expandStatus;
  }

  userAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.filmService.editMode = false;
    this.filmService.createMode = false;
  }

  onFetch() {
    this.storage.getFilms();
  }

  onSave() {
    this.storage.storeFilms().subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
  }
}
