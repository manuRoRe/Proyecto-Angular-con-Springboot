import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsertarCursoComponent } from './editar-insertar-curso.component';

describe('EditarInsertarCursoComponent', () => {
  let component: EditarInsertarCursoComponent;
  let fixture: ComponentFixture<EditarInsertarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInsertarCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInsertarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
