import { DeleteOutlined } from '@mui/icons-material';
import {
	Card,
	CardContent,
	CardHeader,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { FC } from 'react';

export type ActivationFunction = 'sigmoid' | 'relu' | 'tanh' | 'softmax';

export interface NeuronLayerProps {
	layerName?: string;
	neuronCount?: number;
	activationFunction?: ActivationFunction;
	onUpdateLayer?: (payload: {
		neuronCount?: number;
		activationFunction?: ActivationFunction;
	}) => void;
	onDeleteLayer?: () => void;
}

const defaultNeuronLayerProps: NeuronLayerProps = {
	layerName: 'Layer 1',
	neuronCount: 1,
	activationFunction: 'sigmoid',
};

const NeuronLayer: FC<NeuronLayerProps> = ({
	layerName = defaultNeuronLayerProps.layerName,
	neuronCount = defaultNeuronLayerProps.neuronCount,
	activationFunction = defaultNeuronLayerProps.activationFunction,
	onDeleteLayer,
	onUpdateLayer,
}) => {
	return (
		<Card>
			<CardHeader
				subheader={layerName}
				action={[
					<IconButton
						size='small'
						key='delete-button'
						onClick={onDeleteLayer}
					>
						<DeleteOutlined color='error' />
					</IconButton>,
				]}
			/>

			<CardContent>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<FormControl fullWidth size='small' required>
							<InputLabel>Activation function</InputLabel>

							<Select
								label='Activation function'
								placeholder='Activation function'
								value={activationFunction}
								onChange={(event) => {
									onUpdateLayer?.({
										activationFunction: event.target
											.value as ActivationFunction,
										neuronCount,
									});
								}}
							>
								<MenuItem value='sigmoid'>Sigmoid</MenuItem>
								<MenuItem value='relu'>ReLU</MenuItem>
								<MenuItem value='tanh'>Tanh</MenuItem>
								<MenuItem value='softmax'>Softmax</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={6}>
						<TextField
							size='small'
							fullWidth
							type='number'
							label='Neurons'
							placeholder='Neurons'
							value={neuronCount}
							onChange={(event) => {
								onUpdateLayer?.({
									activationFunction,
									neuronCount: Number(event.target.value),
								});
							}}
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default NeuronLayer;
