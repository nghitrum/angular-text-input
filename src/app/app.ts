import { Component, signal } from '@angular/core';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [TextInputComponent, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('learning-angular');

  searchTerm = signal('');

  onSearchChange(value: string) {
    console.log('Search term changed:', value);
    this.searchTerm.set(value);
  }

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.emailForm.valid) {
      console.log('Form submitted with email:', this.emailForm.value.email || '');
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

  get passwordControl() {
    return this.emailForm.get('password');
  }

  get emailError(): string | undefined {
    const control = this.emailControl;

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

  get passwordError(): string | undefined {
    const control = this.passwordControl;

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

  ngOnInit() {
    this.emailForm?.valueChanges.subscribe((v) => console.log('valueChanges →', v));

    this.emailForm?.statusChanges.subscribe((s) => console.log('statusChanges →', s));
  }
}
