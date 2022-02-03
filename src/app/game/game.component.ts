import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  alert = false;
  gameId!: string;
  game = new Game(); //Neues Objekt erstellt
  dialogRef: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) =>{
     
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        this.gameId = params['id'];
        console.log('game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickcard = game.pickcard;
        this.game.playedCard = game.playedCard;
        this.game.pickcard = game.playedcard;
        this.game.currentCard = game.currentCard;
      })
    });
    
  }

  newGame(){
    this.game; 
  }

pickCard(){
    if(this.game.players.length == 0){
      this.alert = true;
    }else if(!this.game.pickcard){ //wenn die variable false ist kann man drauf drücken
      this.game.currentCard = this.game?.stack.pop();
      console.log(this.game.currentCard);
      this.game.pickcard = true;
      this.game.playedCard = true;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();
      this.game.currentPlayer++;
      if(this.game.currentPlayer == this.game.players.length){
        this.game.currentPlayer = 0;
      }

       setTimeout(()=>{ 
          this.game.playedcard = this.game.playedCards.pop();   
          this.game.pickcard = false; //nach 2.5 sec. wird die variable auf false gesetzt und die karte verschwindet
          this.saveGame(); 
      },1250) //erst nach 2.5 sec. kann man wieder drauf drücken
      
    }      
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent);
    
    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.alert = false;
        this.saveGame();
      }   
    });
  }

saveGame(){
   this.firestore.collection('games').doc(this.gameId).update(this.game.gameToJSON());
  }
}
