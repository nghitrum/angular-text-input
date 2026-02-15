# ds-text-input

Reusable text input component for the shared Angular design system.

This component provides a consistent, accessible, and form-compatible input control that works both inside Angular forms and as a standalone UI element.

---

## Overview

`ds-text-input` wraps a native HTML `<input>` element and adds:

- Standardized label, hint, and error presentation
- Built-in accessibility wiring
- Angular Reactive Forms integration via `ControlValueAccessor`
- Configurable states (disabled, readonly, required)
- Typed public API for consistent usage across applications

The component behaves like a native input but with design system structure and styling.

---

## Installation / Import

The component is standalone and must be imported where used.

```ts
import { TextInputComponent } from 'component-path';
```

If used with Angular Reactive Forms, also import:

```ts
import { ReactiveFormsModule } from '@angular/forms';
```

Example:

```ts
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
})
export class ExampleComponent {}
```

---

## Basic Usage

### Standalone input

```html
<ds-text-input label="Search" placeholder="Search products..." (valueChange)="onSearch($event)" />
```

---

### Reactive form usage

```ts
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

```html
<form [formGroup]="form">
  <ds-text-input label="Email" type="email" required formControlName="email" [error]="emailError" />
</form>
```

---

## Public API

### Inputs

| Input         | Type                              | Default        | Description                                              |
| ------------- | --------------------------------- | -------------- | -------------------------------------------------------- |
| `label`       | `string`                          | —              | Visible label displayed above input                      |
| `placeholder` | `string`                          | —              | Native input placeholder                                 |
| `hint`        | `string`                          | —              | Helper text shown below input (hidden when error exists) |
| `error`       | `string`                          | —              | Error message displayed below input                      |
| `type`        | `'text' \| 'email' \| 'password'` | `'text'`       | Native input type                                        |
| `size`        | `'sm' \| 'md' \| 'lg'`            | `'md'`         | Visual size variant                                      |
| `disabled`    | `boolean`                         | `false`        | Disables input interaction                               |
| `readonly`    | `boolean`                         | `false`        | Allows focus but prevents editing                        |
| `required`    | `boolean`                         | `false`        | Marks field as required and sets ARIA metadata           |
| `id`          | `string`                          | auto-generated | Used to associate label and messages                     |
| `value`       | `string`                          | `''`           | Current value (standalone usage)                         |
| `ariaLabel`   | `string`                          | —              | Accessible name when no visible label is provided        |

---

### Outputs

| Output        | Type                   | Description                     |
| ------------- | ---------------------- | ------------------------------- |
| `valueChange` | `EventEmitter<string>` | Emits when user changes value   |
| `focus`       | `EventEmitter<void>`   | Emits when input receives focus |
| `blur`        | `EventEmitter<void>`   | Emits when input loses focus    |

---

## Angular Forms Integration

The component implements `ControlValueAccessor` and supports:

- `formControlName`
- `[formControl]`
- `ngModel`

When used in a form:

- Form controls drive the value
- Validators determine validity
- The component only renders UI and feedback

Validation logic should not be implemented inside the component.

---

## Validation Pattern

Recommended pattern:

1. Define validators in form model
2. Compute error message in parent component
3. Pass message to `error` input

Example:

```ts
get emailError(): string | null {
  const c = this.form.get('email');
  if (!c || !c.touched || !c.invalid) return null;

  if (c.errors?.['required']) return 'Email is required';
  if (c.errors?.['email']) return 'Invalid email format';

  return null;
}
```

---

## Accessibility

The component automatically provides:

- Label association using `for` and `id`
- `aria-invalid` when error is present
- `aria-required` when required
- `aria-describedby` linking hint and error text
- Screen reader announcement of error messages

If no visible label is provided, supply `ariaLabel`.

Example:

```html
<ds-text-input ariaLabel="Search"></ds-text-input>
```

---

## Visual States

The component supports the following states:

- Default
- Focus
- Disabled
- Readonly
- Error
- Required indicator
- Size variants

State priority:

```
disabled > error > focus > default
```

---

## Behavioral Notes

- Error message overrides hint text
- Disabled inputs cannot be focused or edited
- Readonly inputs can be focused but not edited
- Component preserves native keyboard interaction

---

## Theming

Styling should be controlled via design tokens or CSS/SCSS variables.

The component should not rely on hardcoded colors or spacing.

---

## Best Practices

✔ Prefer reactive forms for data entry

✔ Pass error messages from parent logic

✔ Always provide label or ariaLabel

✔ Use size variants for layout consistency (`sm` is default)

✔ Avoid business logic inside component

---

## Anti-Patterns

✘ Implement validation rules inside component

✘ Pass styling values as inputs (e.g. borderColor)

✘ Remove focus outline without replacement

✘ Use both label and ariaLabel simultaneously

---

## Testing Recommendations

- Verify value updates propagate to FormControl
- Verify disabled state syncs with form
- Verify ARIA attributes update correctly
- Verify error messages are announced by screen readers

---

## Versioning

Public API changes must follow semantic versioning.

Breaking changes require migration documentation.

---

## Summary

`ds-text-input` provides a consistent, accessible, and form-compatible input control designed for long-term reuse across applications. It mirrors native input behavior while adding structured UI, accessibility support, and design system integration.
