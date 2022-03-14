import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() Name: string = '';
  @Input() Img: string = '';
  @Input() playerActive: boolean = false;

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {

  }
}

