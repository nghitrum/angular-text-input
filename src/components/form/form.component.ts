import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
  selector: 'ds-form',
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, FormsModule, TextInputComponent],
  styleUrl: './form.component.scss',
  standalone: true,
})
export class FormComponent {
  // ===== REACTIVE FORM SETUP =====
  loginFormReactive = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submitReactive() {
    if (this.loginFormReactive.valid) {
      console.log('Form submitted with email:', this.loginFormReactive.value.email || '');
    } else {
      this.loginFormReactive.markAllAsTouched();
    }
  }

  get emailControlReactive() {
    return this.loginFormReactive.get('email');
  }

  get passwordControlReactive() {
    return this.loginFormReactive.get('password');
  }

  get emailReactiveError(): string | undefined {
    const control = this.emailControlReactive;

    if (!control || !control.touched || !control.invalid) {
      return undefined;
    }

    if (control.errors?.['required']) {
      return 'Email is required';
    }

    if (control.errors?.['email']) {
      return 'Invalid email format';
    }

    return undefined;
  }

  get passwordReactiveError(): string | undefined {
    const control = this.passwordControlReactive;

    if (!control || !control.touched || !control.invalid) {
      return undefined;
    }

    if (control.errors?.['required']) {
      return 'Password is required';
    }

    if (control.errors?.['minlength']) {
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
    }

    return undefined;
  }

  // ===== TEMPLATE-DRIVEN FORM SETUP =====
  emailTemplateDriven = '';
  passwordTemplateDriven = '';

  submitTemplateDriven() {
    console.log('Form submitted with email:', this.emailTemplateDriven);
  }

  emailTemplateDrivenError(control: any): string | undefined {
    if (!control.touched || !control.invalid) return undefined;

    if (control.errors?.required) return 'Email is required';
    if (control.errors?.email) return 'Invalid email format';

    return undefined;
  }

  passwordTemplateDrivenError(control: any): string | undefined {
    if (!control.touched || !control.invalid) return undefined;

    if (control.errors?.required) return 'Password is required';
    if (control.errors?.minlength)
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;

    return undefined;
  }
}
