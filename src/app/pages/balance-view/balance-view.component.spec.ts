import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BalanceViewComponent } from './balance-view.component';
import { Balance, BalanceService } from '../../services/balance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CardComponent } from '../../components/card/card.component';
import { provideHttpClient } from '@angular/common/http';

describe('BalanceViewComponent', () => {
  let component: BalanceViewComponent;
  let fixture: ComponentFixture<BalanceViewComponent>;
  let balanceService: jasmine.SpyObj<BalanceService>;
  let queryParamsSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    balanceService = jasmine.createSpyObj('BalanceService', ['getBalances']);
    queryParamsSubject = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BalanceViewComponent,
        LoaderComponent,
        CardComponent,
      ],
      providers: [
        { provide: BalanceService, useValue: balanceService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParamsSubject.asObservable(),
          },
        },
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert and show invalid date when date query parameter is invalid', fakeAsync(() => {
    spyOn(window, 'alert');
    queryParamsSubject.next({ date: 'invalid-date' });
    fixture.detectChanges();
    tick();

    expect(component.isDateValid).toBeFalse();
    const invalidDate = fixture.debugElement.query(
      By.css('.noBalances h1')
    ).nativeElement;
    expect(invalidDate.textContent).toContain('Invalid date!');
  }));

  it('should load balances when date query parameter is valid', fakeAsync(() => {
    const mockBalances = [
      {
        accountName: 'Account 1',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 2',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 3',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 4',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 5',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
    ];

    queryParamsSubject.next({ date: '2020-03-01' });
    expect(component.isDateValid).toBeTrue();

    component.balances = mockBalances;
    fixture.detectChanges();
    tick();

    expect(component.balances.length).toEqual(5);
    expect(component.loading).toBeFalse();
    expect(fixture.debugElement.query(By.css('app-card'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('td')).length).toBe(5);
  }));

  it('should show no balances message when there are no balances', fakeAsync(() => {
    queryParamsSubject.next({ date: '2020-03-01' });

    component.balances = [];
    fixture.detectChanges();
    tick();

    expect(component.isDateValid).toBeTrue();
    expect(component.balances).toEqual([]);
    expect(component.loading).toBeFalse();

    const noBalances = fixture.debugElement.query(
      By.css('.noBalances h1')
    ).nativeElement;
    expect(noBalances.textContent).toContain(
      'No account balances found for 2020-03-01'
    );
  }));
});
