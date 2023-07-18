import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteIncomingOrderDialogComponent } from './complete-incoming-order-dialog.component';

describe('CompleteIncomingOrderDialogComponent', () => {
  let component: CompleteIncomingOrderDialogComponent;
  let fixture: ComponentFixture<CompleteIncomingOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteIncomingOrderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteIncomingOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
