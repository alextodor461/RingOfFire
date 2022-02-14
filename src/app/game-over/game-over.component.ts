import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  game = new Game();
  cards = Array.from(Array(52).keys());

  constructor() { }

  ngOnInit(): void {
  }

  restartGame(){
    this.cards = Array.from(Array(52).keys());
    this.game.playedCards = [];
    this.game.gameOver = false;
    console.log(this.game.playedCards);
    console.log(this.game.stack);
  }
}
