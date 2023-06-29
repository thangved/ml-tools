import type { Meta, StoryObj } from '@storybook/react';

import UploadFile from '../../components/UploadFile';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'Components/UploadFile',
	component: UploadFile,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof UploadFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithOnSelected: Story = {
	args: {
		onSelected: (data) => {
			console.log(data);
		},
	},
};
