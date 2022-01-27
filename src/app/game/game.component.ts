import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickcard = false;
  playedCard = false;
  game = new Game();
  currentCard: any | undefined = ''; 
  playedcard: any | undefined = ''; 
  constructor() {}

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame(){
    this.game; //Neues Objekt erstellt
  }

  pickCard(){
    if(!this.pickcard){ //wenn die variable false ist kann man drauf drücken
      this.currentCard = this.game?.stack.pop();
      console.log(this.currentCard);
      this.pickcard = true;
      this.playedCard = true;
      this.game.playedCards.push(this.currentCard);
      

       setTimeout(()=>{
          this.pickcard = false; //nach 2.5 sec. wird die variable auf false gesetzt und die karte verschwindet 
          this.playedcard = this.game.playedCards.pop();
      },1250) //erst nach 2.5 sec. kann man wieder drauf drücken
    }  
  }
}
