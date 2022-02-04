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
  gameId: any;
  game = new Game(); //Neues Objekt erstellt
  dialogRef: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) =>{
      this.gameId = params['id'];
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
        
        console.log('game update', game);
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.character = game.character;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickcard = game.pickcard;
        this.game.playedCard = game.playedCard;
        this.game.currentCard = game.currentCard;
        this.game.playedcard = game.playedcard;
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
      this.game.currentPlayer++;
      if(this.game.currentPlayer == this.game.players.length){
        this.game.currentPlayer = 0;
      }
      this.saveGame();
      
       setTimeout(()=>{ 
          this.game.playedcard = this.game.playedCards.pop();   
          this.game.pickcard = false; //nach 2.5 sec. wird die variable auf false gesetzt und die karte verschwindet
          this.saveGame(); 
      },1250) //erst nach 2.5 sec. kann man wieder drauf drücken
    }      
  }

  selectCharacter(characterId: number){
    this.dialogRef.afterClosed().subscribe((change: string) => {
      this.game.character[characterId] = change;
    
    });
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
