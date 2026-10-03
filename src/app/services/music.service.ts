import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private music: HTMLAudioElement;

  private _isPlaying = false;

  constructor() {

    this.music = new Audio(
      'assets/sounds/bgmusic.mp3'
    );

    this.music.loop = true;

    this.music.preload = 'auto';

    this.music.volume = 0.35;

  }


  get isPlaying(): boolean {
    return this._isPlaying;
  }


  play(): void {

    this.music.play()
      .then(() => {

        this._isPlaying = true;

      })
      .catch((error) => {

        console.log(
          'Music could not be played:',
          error
        );

      });

  }


  pause(): void {

    this.music.pause();

    this._isPlaying = false;

  }


  toggle(): void {

    if (this._isPlaying) {

      this.pause();

    } else {

      this.play();

    }

  }


  stop(): void {

    this.music.pause();

    this.music.currentTime = 0;

    this._isPlaying = false;

  }


  setVolume(volume: number): void {

    /*
      Make sure the volume stays
      between 0 and 1.
    */

    this.music.volume = Math.max(
      0,
      Math.min(1, volume)
    );

  }

}