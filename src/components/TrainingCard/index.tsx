import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import type { FC } from 'react';
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

const TrainingCard: FC<TrainingCardProps> = () => {
	return (
		<Card>
			<CardHeader title='Training' />

			<CardContent>
				<Button
					fullWidth
					variant='contained'
					endIcon={<AutoAwesomeOutlined />}
				>
					Training
				</Button>
			</CardContent>
		</Card>
	);
};

export default TrainingCard;
