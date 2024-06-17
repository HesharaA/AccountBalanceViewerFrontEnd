import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceUploadComponent } from './balance-upload.component';

describe('BalanceUploadComponent', () => {
  let component: BalanceUploadComponent;
  let fixture: ComponentFixture<BalanceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
