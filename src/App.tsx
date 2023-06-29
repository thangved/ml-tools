import UploadFile from '@/components/UploadFile';
import { CsvToJsonResultType } from '@/utils/csvToJson';
import { Container } from '@mui/material';
import { useState } from 'react';
import SplitDataUI from './components/SplitDataUI';

function App() {
	const [dataset, setDataset] = useState<CsvToJsonResultType | null>();

	return (
		<>
			<Container>
				<UploadFile onSelected={setDataset} />

				{dataset && <SplitDataUI data={dataset} />}
			</Container>
		</>
	);
}

export default App;
