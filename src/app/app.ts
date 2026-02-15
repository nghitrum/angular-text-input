import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StandaloneComponent } from '../components/standalone/standalone.component';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, StandaloneComponent, FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  theme = 'light';

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
