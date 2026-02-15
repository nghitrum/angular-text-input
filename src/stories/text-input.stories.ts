import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './../components/text-input/text-input.component';

const meta: Meta<TextInputComponent> = {
  title: 'Design System/Text Input',
  component: TextInputComponent,
  tags: ['autodocs'],

  args: {
    label: 'Email',
    size: 'md',
    layout: 'stacked',
    placeholder: 'Enter email',
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
    placeholder: '',
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
    error: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/* =========================================================
   VISUAL COMPARISON (VERY USEFUL)
   ========================================================= */

export const AllLayouts: Story = {
  render: () => ({
    template: `
      <div style="display:grid; gap:24px; width:320px">
        <ds-text-input label="Stacked" layout="stacked"></ds-text-input>
        <ds-text-input label="Inline" layout="inline"></ds-text-input>
        <ds-text-input label="Floating" layout="floating"></ds-text-input>
      </div>
    `,
  }),
};
