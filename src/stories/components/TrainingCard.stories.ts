import type { TrainingCardProps } from '@/components/TrainingCard';
import TrainingCard from '@/components/TrainingCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/TrainingCard',
	component: TrainingCard,
	tags: ['autodocs'],
	argTypes: {
		data: {},
	},
} satisfies Meta<typeof TrainingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: TrainingCardProps = {
	data: {
		xTrain: [],
		yTrain: [],
		xTest: [],
		yTest: [],
	},
	model: {
		layers: [],
		problemType: 'classification',
	},
};

export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
