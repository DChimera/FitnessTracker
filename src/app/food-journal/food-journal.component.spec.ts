import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodJournalComponent } from './food-journal.component';

describe('FoodJournalComponent', () => {
  let component: FoodJournalComponent;
  let fixture: ComponentFixture<FoodJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
