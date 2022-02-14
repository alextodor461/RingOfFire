import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {
  music = new Audio();
  game = new Game();
  constructor(private firestore: AngularFirestore, private router: Router) { }
  ngOnInit(): void {
    setTimeout(()=>{
      this.music.src = "assets/audios/Wild West Story.wav";
      this.music.play();
    },750)
  }

  newGame(){
    this.firestore.collection('games').add(this.game.gameToJSON()).then((gameInfo: any) =>{
      this.router.navigateByUrl('/game/' + gameInfo.id);
      this.music.pause();
      console.log(gameInfo);     
    });
  }
}
