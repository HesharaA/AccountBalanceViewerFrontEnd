import { Component, ElementRef, ViewChild } from '@angular/core';
import { BalanceService } from '../../services/balance.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-balance-upload',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './balance-upload.component.html',
  styleUrl: './balance-upload.component.css',
})
export class BalanceUploadComponent {
  selectedFile: any;
  isUploadButtonDisabled: boolean = true;
  showLoading: boolean = false;

  @ViewChild('fileInput', { static: false })
  InputVar: ElementRef | any;

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
      this.balanceService.uploadBalanceFile(this.selectedFile).subscribe({
        error: (e) => {
          this.showLoading = false;
          this.selectedFile = null;
          this.isUploadButtonDisabled = true;
          this.InputVar.nativeElement.value = '';
          window.alert(e.error);
        },
        complete: () => {
          this.showLoading = false;
          this.selectedFile = null;
          this.isUploadButtonDisabled = true;
          this.InputVar.nativeElement.value = '';
        },
      });
    }
  }
}
