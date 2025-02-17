import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariasListComponent } from './usuarias-list.component';

describe('UsuariasListComponent', () => {
  let component: UsuariasListComponent;
  let fixture: ComponentFixture<UsuariasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
