import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { DetelePlayerComponent } from '../detele-player/detele-player.component';
import { GameOverComponent } from '../game-over/game-over.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameover = new GameOverComponent();
  drinkBeer = new Audio();
  audio2 = new Audio();
  openBottle = new Audio();
  gameId: any;
  game = new Game(); //Neues Objekt erstellt
  dialogRef: any;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) =>{
      this.gameId = params['id'];
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
        
        console.log('game update', this.game);
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.character = game.character;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickcard = game.pickcard;
        this.game.playedCard = game.playedCard;
        this.game.currentCard = game.currentCard;
        this.game.playedcard = game.playedcard;
        this.game.gameOver = game.gameOver;
        this.game.alert = game.alert;
        this.game.beerFull = game.beerFull;
        this.game.beerEmpty = game.beerEmpty;
        this.game.drinkActive = game.drinkActive;
        this.game.beerMug = game.beerMug;
      })
    });
  }

  newGame(){
    this.game; 
  }

  pickCard(cardId: number){
    if(this.game.players.length == 0){
      this.game.alert = true;
    }else{ //wenn die variable false ist kann man drauf drücken
      this.game.currentCard = this.game.stack.pop();  
      this.game.drinkActive = true;
      this.game.pickcard = true;
      this.game.playedCard = true;
      this.game.playedCards.push(this.game.currentCard);
      this.game.currentPlayer++;
      console.log(this.game.stack);
      //this.game.stack.splice(cardId, 0.5);
      if(this.game.currentPlayer == this.game.players.length){
        this.game.currentPlayer = 0;
      }

      this.saveGame();
      
      setTimeout(()=>{
        this.game.drinkActive = false;
      }, 1000)

       setTimeout(()=>{ 
          this.game.playedcard = this.game.playedCards.pop();   
          this.game.pickcard = false; //nach 2.5 sec. wird die variable auf false gesetzt und die karte verschwindet
          this.saveGame(); 
      },1250) //erst nach 2.5 sec. kann man wieder drauf drücken

      setTimeout(() =>{
        if(this.game.stack.length == 0){
          this.game.gameOver = true;
          //this.audio2.src = "assets/audios/Wild West Story.wav";
          //this.audio2.play();
        }
      }, 2000)
    }      
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent);

        dialogRef.afterClosed().subscribe(newPlayer => {
          if(newPlayer){
            this.game.players.push(newPlayer);
            this.game.alert = false;
            this.saveGame();
          }   
        });
      }

      deletePlayer(playerId: number): void {
        const dialogRef = this.dialog.open(DetelePlayerComponent);
    
            dialogRef.afterClosed().subscribe(change => {  
                if(change == 'DELETE'){
                  this.game.players.splice(playerId, 1);
                }     
              this.saveGame();   
            });
          }

  saveGame(){
    this.firestore.collection('games').doc(this.gameId).update(this.game.gameToJSON());
  }

  drink(){
    this.game.beerFull = false;
    this.game.beerEmpty = true;
    this.game.beerMug = true;

    setTimeout(() =>{
      this.game.beerMug = false;
    },750)
    this.drinkBeer.src = "assets/audios/drink.mp3";
    this.drinkBeer.play();
  }

  fillBeer(){
    this.openBottle.src = "/assets/audios/open-bottle.mp3";
    this.openBottle.play();
    this.game.beerFull = true;
    this.game.beerEmpty = false;
  }
}
