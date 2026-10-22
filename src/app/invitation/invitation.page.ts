import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { IonContent } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
  imports: [IonContent, CommonModule],
})
export class InvitationPage implements OnInit, OnDestroy, AfterViewInit {
  // ==========================================
  // PERSONALIZED GODPARENT INVITATIONS
  // ==========================================

  godparents: Record<
    string,
    {
      name: string;
      title: 'Ninang' | 'Ninong';
    }
  > = {
    // NINANGS
    dianna: { name: 'Dianna', title: 'Ninang' },
    nicole: { name: 'Nicole', title: 'Ninang' },
    kaori: { name: 'Kaori', title: 'Ninang' },
    patricia: { name: 'Patricia', title: 'Ninang' },
    aaliyah: { name: 'Aaliyah', title: 'Ninang' },
    jam: { name: 'Jam', title: 'Ninang' },
    ronabel: { name: 'Ronabel', title: 'Ninang' },
    camille: { name: 'Camille', title: 'Ninang' },
    maurisse: { name: 'Maurisse', title: 'Ninang' },
    alexa: { name: 'Alexa', title: 'Ninang' },
    princess: { name: 'Princess', title: 'Ninang' },
    erika: { name: 'Erika', title: 'Ninang' },
    donna: { name: 'Donna', title: 'Ninang' },
    jasmine: { name: 'Jasmine', title: 'Ninang' },
    mikaela: { name: 'Mikaela', title: 'Ninang' },
    yumi: { name: 'Yumi', title: 'Ninang' },
    lykie: { name: 'Lykie', title: 'Ninang' },
    celine: { name: 'Celine', title: 'Ninang' },

    // NINONGS
    'christian-1': { name: 'Christian', title: 'Ninong' },
    paulo: { name: 'Paulo', title: 'Ninong' },
    arvynn: { name: 'Arvynn', title: 'Ninong' },
    edilbert: { name: 'Edilbert', title: 'Ninong' },
    emmanuel: { name: 'Emmanuel', title: 'Ninong' },
    'john-martin': { name: 'John Martin', title: 'Ninong' },
    allen: { name: 'Allen', title: 'Ninong' },
    jemaico: { name: 'Jemaico', title: 'Ninong' },
    karl: { name: 'Karl', title: 'Ninong' },
    gino: { name: 'Gino', title: 'Ninong' },
    december: { name: 'December', title: 'Ninong' },
    fernando: { name: 'Fernando', title: 'Ninong' },
    johnric: { name: 'Johnric', title: 'Ninong' },
    chester: { name: 'Chester', title: 'Ninong' },
    kane: { name: 'Kane', title: 'Ninong' },
    rhaymond: { name: 'Rhaymond', title: 'Ninong' },
    alvin: { name: 'Alvin', title: 'Ninong' },
    allan: { name: 'Allan', title: 'Ninong' },
    oliver: { name: 'Oliver', title: 'Ninong' },
    kyle: { name: 'Kyle', title: 'Ninong' },
    cedric: { name: 'Cedric', title: 'Ninong' },
    edison: { name: 'Edison', title: 'Ninong' },
    cj: { name: 'CJ', title: 'Ninong' },
    renz: { name: 'Renz', title: 'Ninong' },
    franc: { name: 'Franc', title: 'Ninong' },
    'christian-2': { name: 'Christian', title: 'Ninong' },
    ikey: { name: 'Ikey', title: 'Ninong' },
    ronie: { name: 'Rhonie', title: 'Ninong' },
    darrel: { name: 'Darrel', title: 'Ninong' },
    gary: { name: 'Gary', title: 'Ninong' },
  };

  selectedGodparent: {
    name: string;
    title: 'Ninang' | 'Ninong';
  } | null = null;
  // ==========================================
  // COUNTDOWN
  // ==========================================

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
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
    // ==========================================
    // READ PERSONALIZED GUEST LINK
    // ==========================================

    this.route.queryParamMap.subscribe((params) => {
      const guestId = params.get('guest');

      this.selectedGodparent = guestId
        ? (this.godparents[guestId] ?? null)
        : null;

      this.cdr.markForCheck();
    });

    // ==========================================
    // EXISTING COUNTDOWN
    // ==========================================

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
    const targetDate = new Date('2026-10-31T15:30:00+08:00');

    const now = new Date();

    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      this.countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      return;
    }

    this.countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));

    this.countdown.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    this.countdown.minutes = Math.floor((difference / (1000 * 60)) % 60);

    this.countdown.seconds = Math.floor((difference / 1000) % 60);
  }

  // ==========================================
  // INITIALIZE MAPS
  // ==========================================

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.selectedGodparent) {
        this.initializeStPeterMap();
      }

      this.initializeJollibeeMap();
    }, 100);
  }

  // ==========================================
  // ST. PETER PARISH MAP
  // ==========================================

  initializeStPeterMap(): void {
    const churchLat = 14.68133;
    const churchLng = 121.08537;

    const mapElement = document.getElementById('stPeterMap');

    if (!mapElement) {
      console.error('Map element #stPeterMap was not found.');

      return;
    }

    // Prevent duplicate initialization
    if ((mapElement as any)._leaflet_id) {
      return;
    }

    this.stPeterMap = L.map(mapElement, {
      center: [churchLat, churchLng],

      zoom: 17,

      zoomControl: false,

      attributionControl: true,
    });

    // ==========================================
    // OPENSTREETMAP
    // ==========================================

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',

      maxZoom: 19,
    }).addTo(this.stPeterMap);

    // ==========================================
    // MARKER
    // ==========================================

    L.circleMarker([churchLat, churchLng], {
      radius: 9,
      color: '#ffffff',
      weight: 2,
      fillColor: '#e50914',
      fillOpacity: 1,
    })
      .addTo(this.stPeterMap)
      .bindPopup(
        '<strong>St. Peter Parish</strong><br>' + 'Commonwealth, Quezon City',
      );

    // ==========================================
    // LOCATION CIRCLE
    // ==========================================

    L.circle([churchLat, churchLng], {
      radius: 120,
      color: '#e50914',
      weight: 1,
      fillColor: '#e50914',
      fillOpacity: 0.08,
    }).addTo(this.stPeterMap);

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

    const mapElement = document.getElementById('jollibeeMap');

    if (!mapElement) {
      console.error('Map element #jollibeeMap was not found.');

      return;
    }

    // Prevent duplicate initialization
    if ((mapElement as any)._leaflet_id) {
      return;
    }

    this.jollibeeMap = L.map(mapElement, {
      center: [jollibeeLat, jollibeeLng],

      zoom: 17,

      zoomControl: false,

      attributionControl: true,
    });

    // ==========================================
    // OPENSTREETMAP
    // ==========================================

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',

      maxZoom: 19,
    }).addTo(this.jollibeeMap);

    // ==========================================
    // MARKER
    // ==========================================

    L.circleMarker([jollibeeLat, jollibeeLng], {
      radius: 9,
      color: '#ffffff',
      weight: 2,
      fillColor: '#e50914',
      fillOpacity: 1,
    })
      .addTo(this.jollibeeMap)
      .bindPopup(
        '<strong>Jollibee Banaba</strong><br>' + 'Banaba, Quezon City',
      );

    // ==========================================
    // LOCATION CIRCLE
    // ==========================================

    L.circle([jollibeeLat, jollibeeLng], {
      radius: 120,
      color: '#e50914',
      weight: 1,
      fillColor: '#e50914',
      fillOpacity: 0.08,
    }).addTo(this.jollibeeMap);

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
      clearInterval(this.countdownTimer);
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
