import { CsvToJsonResultType } from '@/utils/csvToJson';
import { DeleteOutline, RefreshOutlined } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { FC, useState } from 'react';

export interface SplitDataUIProps {
	data?: CsvToJsonResultType;
}

const SplitDataUI: FC<SplitDataUIProps> = ({ data }) => {
	const [columns, setColumns] = useState<string[]>(data?.header || []);

	const dropColumn = (column: string) => {
		setColumns((prev) => prev.filter((c) => c !== column));
	};

	const resetColumns = () => {
		setColumns(data?.header || []);
	};

	return (
		<Card variant='outlined' sx={{ my: 2 }}>
			<CardHeader
				title='Split Data'
				sx={{ borderBottom: '1px solid #ddd' }}
			/>

			<CardContent>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Typography variant='h6'>Columns</Typography>

						<Stack justifyContent='end' direction='row' spacing={1}>
							<Button
								variant='outlined'
								endIcon={<RefreshOutlined />}
								onClick={resetColumns}
							>
								Reset
							</Button>
						</Stack>

						<Table size='small'>
							<TableBody>
								{columns.map((column) => (
									<TableRow key={column}>
										<TableCell sx={{ flex: 1 }}>
											{column}
										</TableCell>

										<TableCell sx={{ width: 50 }}>
											<IconButton
												onClick={() =>
													dropColumn(column)
												}
											>
												<DeleteOutline />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant='h6'>Target column</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant='h6'>Options</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default SplitDataUI;
