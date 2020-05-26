import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaborListPage } from './labor-list.page';

describe('LaborListPage', () => {
  let component: LaborListPage;
  let fixture: ComponentFixture<LaborListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaborListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
