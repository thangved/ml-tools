import { AddOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useState } from 'react';
import NeuronLayer, { ActivationFunction } from '../NeuronLayer';

export interface NeuronLayerType {
	neurons: number;
	activation: ActivationFunction;
}

const CreateModel = () => {
	const [layers, setLayers] = useState<NeuronLayerType[]>([]);

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
			<CardHeader title='Layers' />

			<CardContent sx={{ background: '#00000010' }}>
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
						variant='contained'
						size='small'
						startIcon={<AddOutlined />}
						fullWidth
						onClick={addLayer}
					>
						Add Layer
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CreateModel;
