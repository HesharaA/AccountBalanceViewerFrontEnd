import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceUploadComponent } from './balance-upload.component';
import { BalanceViewComponent } from '../balance-view/balance-view.component';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

describe('BalanceUploadComponent', () => {
  let component: BalanceUploadComponent;
  let fixture: ComponentFixture<BalanceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceUploadComponent],
      providers: [
        provideRouter([{ path: '**', component: BalanceViewComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select file and upload', fakeAsync(() => {
    spyOn(component, 'onUpload');

    const testingFile = new File([''], 'test-file.txt');

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testingFile);

    const fileInput = fixture.debugElement.query(By.css('input[type=file]'));
    fileInput.nativeElement.files = dataTransfer.files;
    fileInput.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    let uploadButton = fixture.debugElement.nativeElement.querySelector(
      'button[type=submit]'
    );
    uploadButton.click();
    tick();

    expect(component.onUpload).toHaveBeenCalled();
  }));

  it('should click upload without file', fakeAsync(() => {
    spyOn(component, 'onUpload');

    let uploadButton = fixture.debugElement.nativeElement.querySelector(
      'button[type=submit]'
    );
    uploadButton.click();
    tick();

    expect(component.onUpload).not.toHaveBeenCalled();
  }));

  it('should click on available balance', fakeAsync(() => {
    component.availableBalanceDates = [
      new Date('2023-03-01T00:00:00'),
      new Date('2024-03-31T00:00:00'),
    ];
    fixture.detectChanges();

    let availableBalanceButton =
      fixture.debugElement.nativeElement.querySelector('a');
    availableBalanceButton.click();
    tick();

    expect(TestBed.inject(Router).url).toContain('/balances?date');
  }));
});
