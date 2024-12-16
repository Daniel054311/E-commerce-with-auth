import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthErrorMessagePipe } from '../../../shared/utils/pipes/auth-error-message.pipe';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/service/auth.service';
import { ToasterComponent } from '../../../shared/components/toaster/toaster.component';
import { getErrorMessage } from '../../../shared/utils/error.util';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ToasterComponent,ReactiveFormsModule,NavbarComponent,CommonModule,AuthErrorMessagePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit ,OnDestroy{
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  loginForm!: FormGroup;
  private readonly destroy$ = new Subject<void>();


  constructor(private readonly fb: FormBuilder,private readonly authService:AuthService,private readonly router:Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginFormData = this.loginForm.value;
      this.authService.login(loginFormData).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.toaster.showToast({
            message: 'Login successful!',
            type: 'success',
            duration: 3000
          });
          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        },
        error: (error) => {
          const errorMessage = getErrorMessage(error);
          this.toaster.showToast({
            message: errorMessage || 'Login failed. Please try again.',
            type: 'error',
            duration: 5000
          });

        },
      });
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
