import NeuronLayer from '@/components/NeuronLayer';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/NeuronLayer',
	component: NeuronLayer,
	tags: ['autodocs'],
	argTypes: {
		activationFunction: {
			type: 'string',
		},
		neuronCount: {
			type: 'number',
		},
		layerName: {
			type: 'string',
		},
		onDeleteLayer: {
			type: 'function',
		},
		onUpdateLayer: {
			type: 'function',
		},
	},
} satisfies Meta<typeof NeuronLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithData: Story = {
	args: {
		activationFunction: 'relu',
		neuronCount: 10,
		layerName: 'Layer 2',
	},
};
