import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private apiUrl = environment.SPOTIFY_URL;

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get(this.apiUrl + '/artists');
  }
}
