import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  Name: string = '';
  game = new Game();
  allCharacters = ['assets/img/cards/bandit.jpeg', 'assets/img/cards/branding.jpeg', 'assets/img/cards/bull.jpeg', 'assets/img/cards/jack.webp', 'assets/img/cards/sheriff.png']
  constructor(private dialogRef: MatDialogRef<AddPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
