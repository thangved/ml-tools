import { AddOutlined, AutoFixHighOutlined } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from '@mui/material';
import { FC, useState } from 'react';
import type { ActivationFunction } from '../NeuronLayer';
import NeuronLayer from '../NeuronLayer';

export interface NeuronLayerType {
	neurons: number;
	activation: ActivationFunction;
}

export type ProblemType = 'classification' | 'regression';

export interface CreateModelProps {
	onSubmit: (payload: {
		layers: NeuronLayerType[];
		problemType: ProblemType;
	}) => void;
}

const CreateModel: FC<CreateModelProps> = ({ onSubmit }) => {
	const [layers, setLayers] = useState<NeuronLayerType[]>([]);
	const [problemType, setProblemType] =
		useState<ProblemType>('classification');

	const addLayer = () => {
		setLayers([...layers, { neurons: 1, activation: 'sigmoid' }]);
	};

	const removeLayer = (index: number) => {
		const newLayers = [...layers];
		newLayers.splice(index, 1);
		setLayers(newLayers);
	};

	const updateLayer = (index: number, layer: NeuronLayerType) => {
		const newLayers = [...layers];
		newLayers[index] = layer;
		setLayers(newLayers);
	};

	return (
		<Card>
			<CardHeader
				title='Layers'
				action={[
					<FormControl size='small' key='problem-type'>
						<InputLabel>Problem type</InputLabel>

						<Select
							label='Problem type'
							value={problemType}
							onChange={(event) => {
								setProblemType(
									event.target.value as ProblemType,
								);
							}}
						>
							<MenuItem value='classification'>
								Classification
							</MenuItem>

							<MenuItem value='regression'>Regression</MenuItem>
						</Select>
					</FormControl>,
				]}
			/>

			<CardContent sx={{ background: '#00000010', p: 10 }}>
				<Stack spacing={1}>
					{layers.map((layer, index) => (
						<NeuronLayer
							key={index}
							layerName={`Layer ${index}`}
							neuronCount={layer.neurons}
							activationFunction={layer.activation}
							onDeleteLayer={() => removeLayer(index)}
							onUpdateLayer={(payload) => {
								updateLayer(index, {
									neurons:
										payload.neuronCount ?? layer.neurons,
									activation:
										payload.activationFunction ??
										layer.activation,
								});
							}}
						/>
					))}

					<Button
						size='small'
						startIcon={<AddOutlined />}
						fullWidth
						onClick={addLayer}
					>
						Add Layer
					</Button>
				</Stack>
			</CardContent>

			<CardActions>
				<Button
					fullWidth
					variant='outlined'
					startIcon={<AutoFixHighOutlined />}
					size='small'
					onClick={() =>
						onSubmit({
							layers,
							problemType,
						})
					}
				>
					Submit
				</Button>
			</CardActions>
		</Card>
	);
};

export default CreateModel;
