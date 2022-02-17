import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  @Output() restart = new EventEmitter<Game>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  restartGame(){
    console.log("RESTART GAME");
    this.restart.emit(new Game());
    this.router.navigateByUrl('/');
  }
}
