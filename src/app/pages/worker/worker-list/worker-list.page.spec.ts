import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerListPage } from './worker-list.page';

describe('WorkerListPage', () => {
  let component: WorkerListPage;
  let fixture: ComponentFixture<WorkerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
