import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostCenterShowPage } from './cost-center-show.page';

describe('CostCenterShowPage', () => {
  let component: CostCenterShowPage;
  let fixture: ComponentFixture<CostCenterShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostCenterShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
