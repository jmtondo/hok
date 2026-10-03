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

  // ==========================================
  // COUNTDOWN
  // ==========================================

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  countdownTick = false;

  private countdownTimer: any;

  // ==========================================
  // MAPS
  // ==========================================

  private stPeterMap!: L.Map;
  private jollibeeMap!: L.Map;

  constructor(
    private musicService: MusicService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // MUSIC
  // ==========================================

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

    // October 31, 2026 at 3:30 PM
    const targetDate =
      new Date('2026-10-31T15:30:00+08:00');

    const now = new Date();

    const difference =
      targetDate.getTime() - now.getTime();

    if (difference <= 0) {

      this.countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      return;
    }

    this.countdown.days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    this.countdown.hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    this.countdown.minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    this.countdown.seconds = Math.floor(
      (difference / 1000) % 60
    );
  }

  // ==========================================
  // INITIALIZE MAPS
  // ==========================================

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.initializeStPeterMap();
      this.initializeJollibeeMap();

    }, 100);
  }

  // ==========================================
  // ST. PETER PARISH MAP
  // ==========================================

  initializeStPeterMap(): void {

    const churchLat = 14.68133;
    const churchLng = 121.08537;

    const mapElement =
      document.getElementById('stPeterMap');

    if (!mapElement) {

      console.error(
        'Map element #stPeterMap was not found.'
      );

      return;
    }

    // Prevent duplicate initialization
    if ((mapElement as any)._leaflet_id) {
      return;
    }

    this.stPeterMap = L.map(mapElement, {

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
    // ==========================================

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors',

        maxZoom: 19
      }
    ).addTo(this.stPeterMap);

    // ==========================================
    // MARKER
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
      .addTo(this.stPeterMap)
      .bindPopup(
        '<strong>St. Peter Parish</strong><br>' +
        'Commonwealth, Quezon City'
      );

    // ==========================================
    // LOCATION CIRCLE
    // ==========================================

    L.circle(
      [
        churchLat,
        churchLng
      ],
      {
        radius: 120,
        color: '#e50914',
        weight: 1,
        fillColor: '#e50914',
        fillOpacity: 0.08
      }
    ).addTo(this.stPeterMap);

    // Fix map size after rendering
    setTimeout(() => {

      if (this.stPeterMap) {
        this.stPeterMap.invalidateSize();
      }

    }, 300);
  }

  // ==========================================
  // JOLLIBEE BANABA MAP
  // ==========================================

  initializeJollibeeMap(): void {

    const jollibeeLat = 14.67733;
    const jollibeeLng = 121.11134;

    const mapElement =
      document.getElementById('jollibeeMap');

    if (!mapElement) {

      console.error(
        'Map element #jollibeeMap was not found.'
      );

      return;
    }

    // Prevent duplicate initialization
    if ((mapElement as any)._leaflet_id) {
      return;
    }

    this.jollibeeMap = L.map(mapElement, {

      center: [
        jollibeeLat,
        jollibeeLng
      ],

      zoom: 17,

      zoomControl: false,

      attributionControl: true

    });

    // ==========================================
    // OPENSTREETMAP
    // ==========================================

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors',

        maxZoom: 19
      }
    ).addTo(this.jollibeeMap);

    // ==========================================
    // MARKER
    // ==========================================

    L.circleMarker(
      [
        jollibeeLat,
        jollibeeLng
      ],
      {
        radius: 9,
        color: '#ffffff',
        weight: 2,
        fillColor: '#e50914',
        fillOpacity: 1
      }
    )
      .addTo(this.jollibeeMap)
      .bindPopup(
        '<strong>Jollibee Banaba</strong><br>' +
        'Banaba, Quezon City'
      );

    // ==========================================
    // LOCATION CIRCLE
    // ==========================================

    L.circle(
      [
        jollibeeLat,
        jollibeeLng
      ],
      {
        radius: 120,
        color: '#e50914',
        weight: 1,
        fillColor: '#e50914',
        fillOpacity: 0.08
      }
    ).addTo(this.jollibeeMap);

    // Fix map size after rendering
    setTimeout(() => {

      if (this.jollibeeMap) {
        this.jollibeeMap.invalidateSize();
      }

    }, 300);
  }

  // ==========================================
  // CLEANUP
  // ==========================================

  ngOnDestroy(): void {

    // Stop countdown
    if (this.countdownTimer) {

      clearInterval(
        this.countdownTimer
      );

    }

    // Remove St. Peter map
    if (this.stPeterMap) {

      this.stPeterMap.remove();

    }

    // Remove Jollibee map
    if (this.jollibeeMap) {

      this.jollibeeMap.remove();

    }
  }
}
