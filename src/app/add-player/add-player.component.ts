import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  Name: string = '';

  constructor(private dialogRef: MatDialogRef<AddPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
