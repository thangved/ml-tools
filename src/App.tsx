import { Container } from '@mui/material';
import { useState } from 'react';
import UploadFile from './components/UploadFile';
import { CsvToJsonResult } from './utils/csvToJson';

function App() {
	const [, setDataset] = useState<CsvToJsonResult | null>();

	return (
		<>
			<Container>
				<UploadFile onSelected={setDataset} />
			</Container>
		</>
	);
}

export default App;
