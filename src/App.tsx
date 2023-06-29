import UploadFile from '@/components/UploadFile';
import { CsvToJsonResult } from '@/utils/csvToJson';
import { Container } from '@mui/material';
import { useState } from 'react';

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
