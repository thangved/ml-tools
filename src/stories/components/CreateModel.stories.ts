import CreateModel from '@/components/CreateModel';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/CreateModel',
	component: CreateModel,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CreateModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
