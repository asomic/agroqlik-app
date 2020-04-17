import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerFindPage } from './worker-find.page';

describe('WorkerFindPage', () => {
  let component: WorkerFindPage;
  let fixture: ComponentFixture<WorkerFindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerFindPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerFindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
