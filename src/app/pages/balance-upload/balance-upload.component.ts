import { Component } from '@angular/core';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-balance-upload',
  standalone: true,
  imports: [],
  templateUrl: './balance-upload.component.html',
  styleUrl: './balance-upload.component.css',
})
export class BalanceUploadComponent {
  selectedFile: any;

  constructor(private balanceService: BalanceService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.balanceService
        .uploadBalanceFile(this.selectedFile)
        .subscribe((response) => {
          console.log('File uploaded successfully', response);
        });
    }
  }
}
