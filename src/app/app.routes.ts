import { Routes } from '@angular/router';
import { BalanceViewComponent } from './pages/balance-view/balance-view.component';
import { BalanceUploadComponent } from './pages/balance-upload/balance-upload.component';

export const routes: Routes = [
  { path: 'balances', component: BalanceViewComponent },
  { path: 'upload', component: BalanceUploadComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
];
