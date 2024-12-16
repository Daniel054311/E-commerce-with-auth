import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authErrorMessage',
  standalone: true
})
export class AuthErrorMessagePipe implements PipeTransform {

  transform(error: { [key: string]: any }): string {
    if (!error) return '';
    if (error['required']) return 'This field is required.';
    if (error['email']) return 'Invalid email address.';
    if (error['minlength']) return `Minimum length is ${error['minlength'].requiredLength}.`;
    if (error['passwordMismatch']) return 'Passwords do not match.';
    if (error['pattern']) return 'Invalid URL format. Must be a valid image URL ending with .png, .jpg, or .jpeg.';
    return 'Invalid input.';
  }

}
