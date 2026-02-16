import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';

const meta: Meta<TextInputComponent> = {
  title: 'Design System/Text Input',
  component: TextInputComponent,

  args: {
    label: 'Email',
    size: 'md',
    layout: 'stacked',
    placeholder: 'Enter email',
    hint: 'hello hint',
  },

  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    layout: {
      control: 'inline-radio',
      options: ['stacked', 'inline', 'floating'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<TextInputComponent>;

/* =========================================================
   BASIC
   ========================================================= */

export const Default: Story = {};

/* =========================================================
   SIZE VARIANTS
   ========================================================= */

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

/* =========================================================
   LAYOUT VARIANTS
   ========================================================= */

export const Stacked: Story = {
  args: { layout: 'stacked' },
};

export const Inline: Story = {
  args: { layout: 'inline' },
};

export const Floating: Story = {
  args: {
    layout: 'floating',
  },
};

/* =========================================================
   STATES
   ========================================================= */

export const WithHint: Story = {
  args: {
    hint: 'We will not share your email',
  },
};

export const Error: Story = {
  args: {
    value: 'invalid-email',
    error: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    value: 'you@company.com',
    disabled: true,
  },
};
