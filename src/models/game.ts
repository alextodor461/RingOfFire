import { REFERENCE_PREFIX } from "@angular/compiler/src/render3/view/util";

export class Game {
    public players: string[] = [];
    public character: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickcard = false;
    public playedCard = false;
    public currentCard: any = ''; 
    public playedcard: any = ''; 

   
    constructor(){ 
        for(let i= 1; i < 14; i++){
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    public gameToJSON(){
        return{
            players: this.players,
            character: this.character,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickcard: this.pickcard,
            playedCard: this.playedCard,
            currentCard: this.currentCard,
            playedcard: this.playedcard
        };
    }
}

//function zum Mischen der Karten
function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }