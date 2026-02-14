import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'ds-text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  // ===== INTERNAL STATE =====
  value = '';
  private _disabled = false;

  // ===== PUBLIC API =====
  @Input() id = `ds-text-input-${nextId++}`;
  @Input() label?: string;
  @Input() ariaLabel?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() readonly = false;
  @Input() required = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }

  @Output() valueChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  // ===== ACCESSIBILITY IDS =====
  get hintId() {
    return this.hint ? `${this.id}-hint` : null;
  }

  get errorId() {
    return this.error ? `${this.id}-error` : null;
  }

  get describedBy() {
    return [this.hintId, this.errorId].filter(Boolean).join(' ') || null;
  }

  // ===== CONTROL VALUE ACCESSOR =====
  private onChange = (value: string) => {
    console.log('onChange called with:', value);
  };
  private onTouched = () => {
    console.log('onTouched called');
  };

  writeValue(value: string | null): void {
    console.log('writeValue called with:', value);
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    console.log('registerOnChange called');
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    console.log('registerOnTouched called');
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState called with:', isDisabled);
    this._disabled = isDisabled;
  }

  // ===== EVENT HANDLERS =====
  handleInput(event: Event) {
    console.log('handleInput called with:', event);
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  handleFocus() {
    console.log('handleFocus called');
    this.focus.emit();
  }

  handleBlur() {
    console.log('handleBlur called');
    this.onTouched();
    this.blur.emit();
  }
}
