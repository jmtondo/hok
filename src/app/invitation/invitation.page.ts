import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { IonContent } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
  imports: [IonContent],
})
export class InvitationPage
  implements OnInit, OnDestroy, AfterViewInit {

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  countdownTick = false;

  private countdownTimer: any;
  private venueMap!: L.Map;

  constructor(
    private musicService: MusicService,
    private cdr: ChangeDetectorRef
  ) {}

  get musicPaused(): boolean {
    return !this.musicService.isPlaying;
  }

  toggleMusic(): void {
    this.musicService.toggle();
  }

  // ==========================================
  // COUNTDOWN
  // ==========================================

  ngOnInit(): void {

    this.updateCountdown();

    this.countdownTimer = setInterval(() => {

      this.countdownTick = false;

      this.updateCountdown();

      this.cdr.detectChanges();

      requestAnimationFrame(() => {

        this.countdownTick = true;

        this.cdr.detectChanges();

      });

    }, 1000);
  }

  updateCountdown(): void {

    // October 31, 2026 at 6:00 PM
    const targetDate =
      new Date('2026-10-31T18:00:00');

    const now = new Date();

    const difference =
      targetDate.getTime() - now.getTime();

    if (difference <= 0) {

      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;

      return;
    }

    this.days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    this.hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    this.minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    this.seconds = Math.floor(
      (difference / 1000) % 60
    );
  }

  // ==========================================
  // MAP
  // ==========================================

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeVenueMap();
    }, 100);
  }

  initializeVenueMap(): void {

    const churchLat = 14.68133;
    const churchLng = 121.08537;

    // Prevent duplicate map initialization
    const mapElement = document.getElementById('venueMap');

    if (!mapElement) {
      console.error('Map element #venueMap was not found.');
      return;
    }

    // If Leaflet already initialized this element, stop
    if ((mapElement as any)._leaflet_id) {
      return;
    }

    this.venueMap = L.map(mapElement, {

      center: [
        churchLat,
        churchLng
      ],

      zoom: 17,

      zoomControl: false,

      attributionControl: true

    });

    // ==========================================
    // OPENSTREETMAP
    // NO API KEY REQUIRED
    // ==========================================

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors',

        maxZoom: 19
      }
    ).addTo(this.venueMap);

    // ==========================================
    // LOCATION MARKER
    // ==========================================

    L.circleMarker(
      [
        churchLat,
        churchLng
      ],
      {
        radius: 9,
        color: '#ffffff',
        weight: 2,
        fillColor: '#e50914',
        fillOpacity: 1
      }
    )
      .addTo(this.venueMap)
      .bindPopup(
        '<strong>St. Peter Parish</strong><br>' +
        'Commonwealth, Quezon City'
      );

    // ==========================================
    // FIX MAP SIZE AFTER RENDER
    // ==========================================

    setTimeout(() => {

      if (this.venueMap) {
        this.venueMap.invalidateSize();
      }

    }, 300);
  }

  // ==========================================
  // CLEANUP
  // ==========================================

  ngOnDestroy(): void {

    if (this.countdownTimer) {

      clearInterval(
        this.countdownTimer
      );

    }

    if (this.venueMap) {

      this.venueMap.remove();

    }

  }

}