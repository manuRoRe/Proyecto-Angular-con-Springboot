import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsertarInscripcionComponent } from './editar-insertar-inscripcion.component';

describe('EditarInsertarInscripcionComponent', () => {
  let component: EditarInsertarInscripcionComponent;
  let fixture: ComponentFixture<EditarInsertarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInsertarInscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInsertarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
