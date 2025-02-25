import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesinscribirseDialogComponent } from './desinscribirse-dialog.component';

describe('DesinscribirseDialogComponent', () => {
  let component: DesinscribirseDialogComponent;
  let fixture: ComponentFixture<DesinscribirseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesinscribirseDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesinscribirseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
