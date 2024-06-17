import { Component } from '@angular/core';
import { BalanceService } from '../../services/balance.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-balance-upload',
  standalone: true,
  imports: [LoaderComponent, CommonModule, CardComponent],
  templateUrl: './balance-upload.component.html',
  styleUrl: './balance-upload.component.css',
})
export class BalanceUploadComponent {
  selectedFile: any;
  isUploadButtonDisabled: boolean = true;
  showLoading: boolean = false;

  constructor(private balanceService: BalanceService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile !== null || this.selectedFile !== undefined) {
      this.isUploadButtonDisabled = false;
    }
  }

  onUpload(): void {
    this.showLoading = true;
    if (this.selectedFile) {
      this.balanceService
        .uploadBalanceFile(this.selectedFile)
        .subscribe((response) => {
          this.showLoading = false;
          console.log('File uploaded successfully', response);
        });
    }
  }
}
