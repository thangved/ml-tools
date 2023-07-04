import SplitDataUI from '@/components/SplitDataUI';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/SplitDataUI',
	component: SplitDataUI,
	tags: ['autodocs'],
	argTypes: {
		onSplited: {
			type: 'function',
			action: 'splited',
		},
		data: {},
	},
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
		onSplited(data) {
			console.log(data);
		},
	},
};
