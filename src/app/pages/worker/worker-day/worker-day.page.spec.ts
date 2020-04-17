import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerDayPage } from './worker-day.page';

describe('WorkerDayPage', () => {
  let component: WorkerDayPage;
  let fixture: ComponentFixture<WorkerDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
