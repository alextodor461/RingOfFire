import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {
  
  constructor(private router: Router) { }
  audio = new Audio();
  ngOnInit(): void {
    this.playAudio();
  }

  newGame(){
    this.router.navigateByUrl('/game');
    this.audio.pause();
  }

  playAudio(){
    this.audio.src = "assets/audios/Hard Rock full 120.mp3";
    this.audio.load();
    this.audio.play();
  }
}
