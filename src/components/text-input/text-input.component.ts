import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'ds-text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
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
  // =================================================
  // INTERNAL STATE
  // =================================================

  private _value = '';
  private _disabled = false;

  // =================================================
  // PUBLIC API
  // =================================================

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
  @Input() layout: 'stacked' | 'inline' | 'floating' = 'stacked';

  @Input()
  set value(v: string) {
    this._value = v ?? '';
  }
  get value() {
    return this._value;
  }

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

  // =================================================
  // ACCESSIBILITY
  // =================================================

  get hintId() {
    return this.hint ? `${this.id}-hint` : null;
  }

  get errorId() {
    return this.error ? `${this.id}-error` : null;
  }

  get describedBy(): string | null {
    return this.errorId ?? this.hintId ?? null;
  }

  // =================================================
  // CONTROL VALUE ACCESSOR
  // =================================================

  private onChange = (_: string) => {};
  private onTouched = () => {};

  writeValue(value: string | null) {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  // =================================================
  // EVENTS
  // =================================================

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  handleFocus() {
    this.focus.emit();
  }

  handleBlur() {
    this.onTouched();
    this.blur.emit();
  }

  // =================================================
  // HOST CLASSES
  // =================================================

  @HostBinding('class.ds-text-input') baseClass = true;

  @HostBinding('class.disabled') get hostDisabled() {
    return this.disabled;
  }

  @HostBinding('class.error') get hostError() {
    return !!this.error;
  }

  @HostBinding('class.size-sm') get sizeSm() {
    return this.size === 'sm';
  }

  @HostBinding('class.size-md') get sizeMd() {
    return this.size === 'md';
  }

  @HostBinding('class.size-lg') get sizeLg() {
    return this.size === 'lg';
  }

  @HostBinding('class.layout-stacked')
  get isStacked() {
    return this.layout === 'stacked';
  }

  @HostBinding('class.layout-inline')
  get isInline() {
    return this.layout === 'inline';
  }

  @HostBinding('class.layout-floating')
  get isFloating() {
    return this.layout === 'floating';
  }

  @HostBinding('class.has-value')
  get hasValue() {
    return !!this.value;
  }
}
