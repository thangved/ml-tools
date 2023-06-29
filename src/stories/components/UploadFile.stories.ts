import type { Meta, StoryObj } from '@storybook/react';

import UploadFile from '../../components/UploadFile';

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
