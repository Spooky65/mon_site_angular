import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieramaComponent } from './movierama.component';

describe('MovieramaComponent', () => {
  let component: MovieramaComponent;
  let fixture: ComponentFixture<MovieramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
