import { UploadFileOutlined } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	LinearProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FC, ReactEventHandler, useCallback, useState } from 'react';
import csvToJson, { CsvToJsonResultType } from '../../utils/csvToJson';

export interface UploadFileProps {
	onSelected?: (data: CsvToJsonResultType) => void;
}

const UploadFile: FC<UploadFileProps> = ({ onSelected }) => {
	const [data, setData] = useState<{
		header: string[];
		rows: Record<string, string>[];
	}>();

	const [loading, setLoading] = useState(false);

	const handleSelectedFile: ReactEventHandler<HTMLInputElement> = useCallback(
		async (event) => {
			setLoading(true);

			const file = event.currentTarget.files?.[0];

			if (!file) {
				return;
			}

			const data = await csvToJson(file);

			setData(data);

			setLoading(false);

			onSelected?.(data);
		},
		[onSelected],
	);

	return (
		<Card variant='outlined' sx={{ my: 2 }}>
			<CardHeader
				title='Upload file'
				subheader='Only support .csv file'
				action={[
					<Button
						key='upload-file-button'
						variant='contained'
						startIcon={<UploadFileOutlined />}
						component='label'
					>
						Select file
						<input
							hidden
							type='file'
							accept='.csv'
							onChange={handleSelectedFile}
						/>
					</Button>,
				]}
				sx={{ borderBottom: '1px solid #ddd' }}
			/>

			{loading && <LinearProgress variant='indeterminate' />}

			<CardContent sx={{ p: 0 }}>
				{data && (
					<DataGrid
						sx={{ border: 'none' }}
						columns={data.header.map((col) => ({
							field: col,
							flex: 1,
							minWidth: 150,
						}))}
						rows={data.rows.map((e, id) => ({ ...e, id }))}
						loading={loading}
						density='compact'
						pageSizeOptions={[5, 10, 20]}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default UploadFile;
