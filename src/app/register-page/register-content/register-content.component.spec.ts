import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContentComponent } from './register-content.component';

describe('RegisterContentComponent', () => {
  let component: RegisterContentComponent;
  let fixture: ComponentFixture<RegisterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
