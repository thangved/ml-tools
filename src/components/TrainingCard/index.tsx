/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useState, type FC } from 'react';
import Chart from 'react-apexcharts';
import type { NeuronLayerType, ProblemType } from '../CreateModel';

export interface TrainingCardProps {
	data: {
		xTrain: unknown[][];
		yTrain: unknown[];
		xTest: unknown[][];
		yTest: unknown[];
	};
	model: {
		layers: NeuronLayerType[];
		problemType: ProblemType;
	};
}

const TrainingCard: FC<TrainingCardProps> = ({
	model: { layers, problemType },
	data,
}) => {
	const [model, setModel] = useState<tf.Sequential>();
	const [categories, setCategories] = useState<number[]>([]);
	const [loss, setLoss] = useState<number[]>([]);
	const [accuracy, setAccuracy] = useState<number[]>([]);

	const train = async () => {
		if (!model) return;

		model.compile({
			loss: 'meanSquaredError',
			optimizer: 'sgd',
			metrics: ['accuracy'],
		});

		setCategories([]);
		setLoss([]);
		setAccuracy([]);

		const tfXTrain = tf.tensor2d(data.xTrain as number[][]);
		const tfYTrain = tf.tensor1d(data.yTrain as number[]);

		const tfXTest = tf.tensor2d(data.xTest as number[][]);
		const tfYTest = tf.tensor1d(data.yTest as number[]);

		await model.fit(tfXTrain, tfYTrain, {
			epochs: 100,
			validationData: [tfXTest, tfYTest],
			callbacks: {
				onEpochEnd(epoch, logs: any) {
					setCategories((categories) => [...categories, epoch]);
					setLoss((loss) => [...loss, logs.loss]);
					setAccuracy((accuracy) => [...accuracy, logs.acc]);
				},

				onTrainEnd() {
					alert('Training done!');
				},
			},
		});
	};

	useEffect(() => {
		const model = tf.sequential();

		model.add(
			tf.layers.dense({
				units: layers[0].neurons,
				inputShape: [data.xTrain[0].length],
				activation: layers[0].activation,
			}),
		);

		for (const layer of layers.slice(1)) {
			model.add(
				tf.layers.dense({
					units: layer.neurons,
					activation: layer.activation,
				}),
			);
		}

		setModel(model);
	}, [layers, problemType, data]);

	return (
		<Card>
			<CardHeader title='Training' />

			<CardContent>
				<Chart
					width={500}
					type='line'
					options={{
						xaxis: {
							categories,
							labels: {
								show: false,
							},
						},
						yaxis: {
							labels: {
								show: false,
							},
						},
						chart: {
							toolbar: {
								show: false,
							},
						},
					}}
					series={[
						{
							name: 'loss',
							data: loss,
						},
						{
							name: 'accuracy',
							data: accuracy,
						},
					]}
				/>

				<Button
					fullWidth
					variant='contained'
					endIcon={<AutoAwesomeOutlined />}
					onClick={train}
				>
					Training
				</Button>
			</CardContent>
		</Card>
	);
};

export default TrainingCard;
