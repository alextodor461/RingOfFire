import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detele-player',
  templateUrl: './detele-player.component.html',
  styleUrls: ['./detele-player.component.scss']
})
export class DetelePlayerComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DetelePlayerComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
