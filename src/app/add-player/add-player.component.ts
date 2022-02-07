import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  character: string;
  name: string;
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  @Input() character = '';
  @Input() Name = '';
  allCharacters = ['assets/img/cards/bandit.jpeg', 'assets/img/cards/branding.jpeg', 'assets/img/cards/bull.jpeg', 'assets/img/cards/jack.webp', 'assets/img/cards/sheriff.png'];

  constructor(
    public dialogRef: MatDialogRef<AddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
