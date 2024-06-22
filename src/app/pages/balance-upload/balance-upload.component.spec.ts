import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceUploadComponent } from './balance-upload.component';
import { BalanceViewComponent } from '../balance-view/balance-view.component';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { Roles } from '../../services/rbac.servies';

describe('BalanceUploadComponent', () => {
  let component: BalanceUploadComponent;
  let fixture: ComponentFixture<BalanceUploadComponent>;

  function selectUser(userRole: Roles) {
    const liElements = fixture.debugElement.queryAll(By.css('li'));
    expect(liElements.length).toBe(2);

    liElements[userRole === Roles.ADMINISTRATOR ? 0 : 1].triggerEventHandler(
      'click',
      null
    );
    fixture.detectChanges();
    tick();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceUploadComponent],
      providers: [
        provideRouter([{ path: '**', component: BalanceViewComponent }]),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select admin role', fakeAsync(() => {
    selectUser(Roles.ADMINISTRATOR);
    spyOn(component, 'onUpload');

    const fileInput = fixture.debugElement.query(By.css('input[type=file]'));

    expect(fileInput).toBeTruthy();
  }));

  it('should select user role', fakeAsync(() => {
    selectUser(Roles.USER);
    spyOn(component, 'onUpload');

    const fileInput = fixture.debugElement.query(By.css('input[type=file]'));

    expect(fileInput).toBeFalsy();
  }));

  it('should select file and upload', fakeAsync(() => {
    selectUser(Roles.ADMINISTRATOR);
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
    selectUser(Roles.ADMINISTRATOR);
    spyOn(component, 'onUpload');

    let uploadButton = fixture.debugElement.nativeElement.querySelector(
      'button[type=submit]'
    );
    uploadButton.click();
    tick();

    expect(component.onUpload).not.toHaveBeenCalled();
  }));

  it('should click on available balance', fakeAsync(() => {
    selectUser(Roles.ADMINISTRATOR);
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
