import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BalanceService } from '../../services/balance.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { handleHttpError } from '../../utils/error-handler';

/**
 * @description
 * The BalanceUploadComponent is responsible for managing the upload of balance files.
 * It allows the user to select a file, upload it and shows available balances if there are any.
 */
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
  /**
   * @description The file selected by the user for upload.
   */
  selectedFile: any;

  /**
   * @description A flag indicating if the upload button is disabled.
   */
  isUploadButtonDisabled: boolean = true;

  /**
   * @description A flag indicating if the loading indicator should be displayed.
   */
  showLoading: boolean = false;

  /**
   * @description An array of available balance dates fetched from the server.
   */
  availableBalanceDates: Date[] | null = null;

  /**
   * @description A reference to the file input element.
   */
  @ViewChild('fileInput', { static: false })
  InputVar: ElementRef | any;

  /**
   * @param {BalanceService} balanceService - The service to handle balance-related operations.
   * @param {Router} router - The router service for navigation.
   */
  constructor(private balanceService: BalanceService, private router: Router) {}

  /**
   * @description Fetches the distinct balance dates from the balance service.
   */
  ngOnInit(): void {
    this.balanceService.getDistinctBalances().subscribe({
      error: (e) => {
        this.availableBalanceDates = [];
        handleHttpError(e);
      },
      next: (data) => {
        this.availableBalanceDates = data.reverse();
      },
    });
  }

  /**
   * @description Resets the file input, selected file, and upload button state.
   * @private
   */
  private resetFileInput(): void {
    this.showLoading = false;
    this.selectedFile = null;
    this.isUploadButtonDisabled = true;
    this.InputVar.nativeElement.value = '';
  }

  /**
   * @description Event handler for file selection. Enables the upload button if a file is selected.
   * @param {Event} event - The event object from the file input change event.
   */
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile !== null || this.selectedFile !== undefined) {
      this.isUploadButtonDisabled = false;
    }
  }

  /**
   * @description Handles the file upload process. Shows a loading indicator during the upload and
   * navigates to the balances page upon successful upload.
   */
  onUpload(): void {
    this.showLoading = true;
    if (this.selectedFile) {
      this.balanceService.uploadBalanceFile(this.selectedFile).subscribe({
        error: (e) => {
          this.resetFileInput();
          handleHttpError(e);
        },
        next: (balance) => {
          this.resetFileInput();
          this.router.navigate(['/balances'], {
            queryParams: { date: balance[0].balanceDate },
          });
        },
      });
    }
  }
}
