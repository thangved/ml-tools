import SplitDataUI from '@/components/SplitDataUI';
import UploadFile from '@/components/UploadFile';
import type { CsvToJsonResultType } from '@/utils/csvToJson';
import { Container, Stack } from '@mui/material';
import { useState } from 'react';
import type { NeuronLayerType, ProblemType } from './components/CreateModel';
import CreateModel from './components/CreateModel';
import TrainingCard from './components/TrainingCard';

function App() {
	const [dataset, setDataset] = useState<CsvToJsonResultType | null>();
	const [splitedData, setSplitedData] = useState<{
		xTrain: unknown[][];
		xTest: unknown[][];
		yTrain: unknown[];
		yTest: unknown[];
	}>();

	const [model, setModel] = useState<{
		layers: NeuronLayerType[];
		problemType: ProblemType;
	}>();

	return (
		<>
			<Container sx={{ my: 2 }}>
				<Stack spacing={2}>
					<UploadFile onSelected={setDataset} />

					{dataset && (
						<SplitDataUI
							data={dataset}
							onSplited={setSplitedData}
						/>
					)}

					{splitedData && <CreateModel onSubmit={setModel} />}

					{model && splitedData && (
						<TrainingCard data={splitedData} model={model} />
					)}
				</Stack>
			</Container>
		</>
	);
}

export default App;
