import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthErrorMessagePipe } from '../../../shared/utils/pipes/auth-error-message.pipe';
import { ToasterComponent } from '../../../shared/components/toaster/toaster.component';
import { AuthService } from '../../../core/service/auth.service';
import { getErrorMessage } from '../../../shared/utils/error.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AuthErrorMessagePipe, ToasterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;
  registerForm!: FormGroup;
  isLoading = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }



  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { confirmPassword, ...registrationData } = this.registerForm.value;

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          this.toaster.showToast({
            message: 'Registration successful!',
            type: 'success',
            duration: 3000
          });
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        },
        error: (error) => {
          const errorMessage = getErrorMessage(error);
          this.toaster.showToast({
            message: errorMessage || 'Registration failed. Please try again.',
            type: 'error',
            duration: 5000
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }




}
