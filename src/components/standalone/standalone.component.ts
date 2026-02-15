import { Component } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'ds-standalone',
  standalone: true,
  templateUrl: './standalone.component.html',
  imports: [FormsModule, TextInputComponent],
})
export class StandaloneComponent {
  searchTermReactive = '';
  searchTermTemplateDriven = '';

  onSearchChange(value: string) {
    console.log('Search term changed:', value);
    this.searchTermReactive = value;
  }
}
