import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsertarCentroComponent } from './editar-insertar-centro.component';

describe('EditarInsertarCentroComponent', () => {
  let component: EditarInsertarCentroComponent;
  let fixture: ComponentFixture<EditarInsertarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInsertarCentroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInsertarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
