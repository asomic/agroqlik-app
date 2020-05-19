import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerLaborEditPage } from './worker-labor-edit.page';

describe('WorkerLaborEditPage', () => {
  let component: WorkerLaborEditPage;
  let fixture: ComponentFixture<WorkerLaborEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerLaborEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerLaborEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
