import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent],
})
export class HomePage {

  isStarting = false;
  isOpened = false;

  private engineSound: HTMLAudioElement;


  constructor(
    private router: Router,
    private musicService: MusicService
  ) {

    this.engineSound = new Audio(
      'assets/sounds/v12.mp3'
    );

    this.engineSound.preload = 'auto';

    this.engineSound.volume = 0.9;


    // Debug engine sound
    this.engineSound.addEventListener(
      'canplaythrough',
      () => {

        console.log(
          '✅ Engine rev loaded'
        );

      }
    );

    this.engineSound.addEventListener(
      'error',
      (error) => {

        console.error(
          '❌ Engine rev error:',
          error
        );

      }
    );

  }


  pushToStart(): void {

    // Prevent double clicking
    if (this.isStarting) {
      return;
    }

    console.log(
      '🚗 PUSH TO START'
    );


    // ==========================================
    // ENGINE REV
    // ==========================================

    this.engineSound.currentTime = 0;

    this.engineSound
      .play()
      .then(() => {

        console.log(
          '🔊 ENGINE REV PLAYING'
        );

      })
      .catch((error) => {

        console.error(
          '❌ ENGINE REV FAILED:',
          error
        );

      });


    // ==========================================
    // BACKGROUND MUSIC
    // ==========================================

    this.musicService.play();


    // ==========================================
    // START BUTTON ANIMATION
    // ==========================================

    this.isStarting = true;


    // ==========================================
    // OPENING ANIMATION
    // ==========================================

    setTimeout(() => {

      this.isOpened = true;

    }, 1300);


    // ==========================================
    // GO TO INVITATION
    // ==========================================

    setTimeout(() => {

      this.router.navigate([
        '/invitation'
      ]);

    }, 2200);

  }

}