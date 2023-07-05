import type { CsvToJsonResultType } from '@/utils/csvToJson';
import {
	DeleteOutline,
	RefreshOutlined,
	SplitscreenOutlined,
} from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

export interface SplitDataUIProps {
	data?: CsvToJsonResultType;
	onSplited?: (payload: {
		xTrain: unknown[][];
		xTest: unknown[][];
		yTrain: unknown[];
		yTest: unknown[];
		columns: string[];
		targetColumn: string;
	}) => void;
}

const SplitDataUI: FC<SplitDataUIProps> = ({ data, onSplited }) => {
	const [columns, setColumns] = useState<string[]>(() => {
		return data?.header || [];
	});

	const [targetColumn, setTargetColumn] = useState<string>();

	const [testSize, setTestSize] = useState<number>(0.2);

	const [random, setRandom] = useState<boolean>(false);

	const dropColumn = (column: string) => {
		setColumns((prev) => prev.filter((c) => c !== column));
	};

	const resetColumns = () => {
		setColumns(data?.header || []);
	};

	useEffect(() => {
		setColumns(data?.header || []);
	}, [data]);

	useEffect(() => {
		setTargetColumn(columns[columns.length - 1]);
	}, [columns]);

	const isValidTargetColumn = targetColumn && columns.includes(targetColumn);

	const isValidTestSize = testSize && testSize >= 0 && testSize <= 1;

	const isValid = isValidTargetColumn && isValidTestSize;

	const handleSplit = () => {
		if (!isValid) {
			return;
		}

		const targetColumnIndex = columns.indexOf(targetColumn as string);

		const x = [];

		for (const row of data?.rows || []) {
			const xRow = [];

			for (const key of columns) {
				if (key === targetColumn) continue;

				xRow.push(row[key]);
			}

			x.push(xRow);
		}

		const y = data?.rows.map((row) => {
			return Object.values(row)[targetColumnIndex];
		});

		const trainSize = 1 - testSize;

		const xTrain = x?.slice(0, Math.floor(x.length * trainSize)) || [];

		const xTest = x?.slice(Math.floor(x.length * trainSize) + 1) || [];

		const yTrain = y?.slice(0, Math.floor(y.length * trainSize)) || [];

		const yTest = y?.slice(Math.floor(y.length * trainSize) + 1) || [];

		onSplited?.({ xTrain, xTest, yTrain, yTest, columns, targetColumn });
	};

	return (
		<Card>
			<CardHeader
				title='Split Data'
				sx={{
					borderBottom: '1px solid #ddd',
				}}
				action={[
					<Button
						key='split-data-button'
						variant='contained'
						startIcon={<SplitscreenOutlined />}
						disabled={!isValid}
						onClick={handleSplit}
					>
						Split
					</Button>,
				]}
			/>

			<CardContent>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Columns
						</Typography>

						<Stack justifyContent='end' direction='row' spacing={1}>
							<Button
								variant='outlined'
								endIcon={<RefreshOutlined />}
								onClick={resetColumns}
							>
								Reset
							</Button>
						</Stack>

						<div style={{ maxHeight: 500, overflow: 'auto' }}>
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
						</div>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Target column
						</Typography>

						<FormControl
							fullWidth
							size='small'
							required
							error={!isValidTargetColumn}
						>
							<Select
								placeholder='Target column'
								label='Target column'
								value={targetColumn || ''}
								onChange={(event) => {
									setTargetColumn(
										event.target.value as string,
									);
								}}
							>
								{columns.map((column) => (
									<MenuItem key={column} value={column}>
										{column}
									</MenuItem>
								))}
							</Select>

							<InputLabel>Target column</InputLabel>

							<FormHelperText>
								{!isValidTargetColumn &&
									'Please select target column'}
							</FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Options
						</Typography>

						<Stack spacing={1}>
							<TextField
								error={!isValidTestSize}
								helperText={
									!isValidTestSize ? 'Invalid value' : ''
								}
								type='number'
								size='small'
								label='Test size'
								placeholder='Test size'
								inputProps={{
									min: 0,
									max: 1,
								}}
								required
								value={testSize}
								onChange={(event) => {
									setTestSize(parseFloat(event.target.value));
								}}
							/>

							<FormControlLabel
								label='Random'
								control={
									<Switch
										checked={random}
										onChange={(event) => {
											setRandom(event.target.checked);
										}}
									/>
								}
							/>
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default SplitDataUI;
