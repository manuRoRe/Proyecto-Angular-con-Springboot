import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsertarUsuarioComponent } from './editar-insertar-usuario.component';

describe('EditarInsertarUsuarioComponent', () => {
  let component: EditarInsertarUsuarioComponent;
  let fixture: ComponentFixture<EditarInsertarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInsertarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInsertarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
