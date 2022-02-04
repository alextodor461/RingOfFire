import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() playerActive: boolean = false;
  @Input() name: any;
  @Input() image: any;

  constructor() { }

  ngOnInit(): void {
  }
}
