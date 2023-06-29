import type { Meta, StoryObj } from '@storybook/react';

import SplitDataUI from '../../components/SplitDataUI';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'Components/SplitDataUI',
	component: SplitDataUI,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SplitDataUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithData: Story = {
	args: {
		data: {
			header: ['name', 'age', 'gender', 'country'],
			rows: [
				{
					name: 'John',
					age: 20,
					gender: 'male',
					country: 'USA',
				},
				{
					name: 'John Doe',
					age: 19,
					gender: 'male',
					country: 'USA',
				},
			],
		},
	},
};
