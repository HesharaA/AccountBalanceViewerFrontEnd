import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BalanceService } from '../../services/balance.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-balance-upload',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './balance-upload.component.html',
  styleUrl: './balance-upload.component.css',
})
export class BalanceUploadComponent implements OnInit {
  selectedFile: any;
  isUploadButtonDisabled: boolean = true;
  showLoading: boolean = false;

  @ViewChild('fileInput', { static: false })
  InputVar: ElementRef | any;
  availableBalanceDates: Date[] = [];

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.getDistinctBalances().subscribe({
      error: (e) => {
        window.alert(e.error);
      },
      next: (data) => {
        this.availableBalanceDates = data.reverse();
      },
    });
  }

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
