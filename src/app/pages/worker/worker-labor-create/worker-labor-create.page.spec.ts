import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerLaborCreatePage } from './worker-labor-create.page';

describe('WorkerLaborCreatePage', () => {
  let component: WorkerLaborCreatePage;
  let fixture: ComponentFixture<WorkerLaborCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerLaborCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerLaborCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
