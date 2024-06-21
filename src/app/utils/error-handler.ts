import { HttpErrorResponse } from '@angular/common/http';

/**
 * @description
 * A utility function to handle HTTP errors. It displays an appropriate error message
 * to the user based on the HTTP status code of the error response.
 *
 * @param {HttpErrorResponse} error - The HTTP error response object.
 */
export function handleHttpError(error: HttpErrorResponse): void {
  /**
   * @description The error message to be displayed to the user.
   */
  let errorMessage: string;

  if (error.status === 400) {
    errorMessage = error.error;
  } else {
    errorMessage = 'Error! Please try again.';
  }

  window.alert(errorMessage);
}
