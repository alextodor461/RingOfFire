import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickcard = false;
  playedCard = false;
  game = new Game(); //Neues Objekt erstellt
  currentCard: any | undefined = ''; 
  playedcard: any | undefined = ''; 
  dialogRef: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame(){
    this.game; 
  }

  pickCard(){
    if(!this.pickcard){ //wenn die variable false ist kann man drauf drücken
      this.currentCard = this.game?.stack.pop();
      console.log(this.currentCard);
      this.pickcard = true;
      this.playedCard = true;
      this.game.playedCards.push(this.currentCard);

      this.game.currentPlayer++;

      if(this.game.currentPlayer == this.game.players.length){
        this.game.currentPlayer = 0;
      }

       setTimeout(()=>{
          this.pickcard = false; //nach 2.5 sec. wird die variable auf false gesetzt und die karte verschwindet 
          this.playedcard = this.game.playedCards.pop();
      },1250) //erst nach 2.5 sec. kann man wieder drauf drücken
    }  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent);
    
    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }   
    });
  }
}
