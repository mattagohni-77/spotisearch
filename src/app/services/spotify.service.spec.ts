import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Data} from '@angular/router';
import {SpotifyService} from './spotify.service';
import {environment} from '../../environments/environment';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('is injected correctly', inject([SpotifyService], (spotify: SpotifyService) => {
      expect(spotify).toBeTruthy();
    }
  ));

  it('can get list of artists', inject([SpotifyService], (spotify: SpotifyService) => {
    const testData: Data = {
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy'
          },
          followers: {
            href: null,
            total: 4096384
          },
          genres: [
            'album rock',
            'art rock',
            'dance rock',
            'glam rock',
            'new wave',
            'permanent wave',
            'protopunk',
            'rock'
          ],
          href: 'https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy',
          id: '0oSGxfWSnnOXhD2fKuz2Gy',
          images: [
            {
              height: 1000,
              url: 'https://i.scdn.co/image/6efa04809a6358a5da0e701d24449cfb8348ebf5',
              width: 1000
            },
            {
              height: 640,
              url: 'https://i.scdn.co/image/76e50c6493a4173e5294374ae88be0ce42ed091e',
              width: 640
            },
            {
              height: 200,
              url: 'https://i.scdn.co/image/c74188cfa692266ce5d61790d8b00880980bef20',
              width: 200
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/0fc6cc36af66813555cc969755a1a30488758e2a',
              width: 64
            }
          ],
          name: 'David Bowie',
          popularity: 83,
          type: 'artist',
          uri: 'spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy'
        },
      ]
    };

    const testUrl = environment.SPOTIFY_URL + '/artists';

    spotify.getArtists()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const request = httpTestingController.expectOne(environment.SPOTIFY_URL + '/artists');

    expect(request.request.method).toEqual('GET');
    expect(request.cancelled).toBeFalsy();
    request.flush(testData);

    httpTestingController.verify();
  }));
});
