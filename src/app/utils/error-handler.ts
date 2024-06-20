import { HttpErrorResponse } from '@angular/common/http';

export function handleHttpError(error: HttpErrorResponse) {
  var errorMessage;

  if (error.status === 400) {
    errorMessage = error.error;
  } else {
    errorMessage = 'Error! Please try again.';
  }

  window.alert(errorMessage);
}
