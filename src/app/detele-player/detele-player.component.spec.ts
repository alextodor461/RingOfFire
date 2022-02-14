import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetelePlayerComponent } from './detele-player.component';

describe('DetelePlayerComponent', () => {
  let component: DetelePlayerComponent;
  let fixture: ComponentFixture<DetelePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetelePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetelePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
