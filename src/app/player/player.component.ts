import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() game: any;
  @Input() playerActive: boolean = false;
  @Input() image: any;
  character: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      data: {
        game: this.game,
        animal: this.character,        
        name: this.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed', result);
      if (result != undefined) {
        this.name = result[0];
        this.character = result[1];
      this.game.addPlayer(result);
      }
      
    });
  }

  ngOnInit(): void {

  }
}

