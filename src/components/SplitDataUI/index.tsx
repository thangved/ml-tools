import { CsvToJsonResultType } from '@/utils/csvToJson';
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
	FormHelperText,
	Grid,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

export interface SplitDataUIProps {
	data?: CsvToJsonResultType;
}

const SplitDataUI: FC<SplitDataUIProps> = ({ data }) => {
	const [columns, setColumns] = useState<string[]>(() => {
		return data?.header || [];
	});

	const [targetColumn, setTargetColumn] = useState<string>();

	const dropColumn = (column: string) => {
		setColumns((prev) => prev.filter((c) => c !== column));
	};

	const resetColumns = () => {
		setColumns(data?.header || []);
	};

	useEffect(() => {
		setColumns(data?.header || []);
	}, [data]);

	const isValid = !!targetColumn;

	return (
		<Card variant='outlined' sx={{ my: 2 }}>
			<CardHeader
				title='Split Data'
				sx={{ borderBottom: '1px solid #ddd' }}
				action={[
					<Button
						key='split-data-button'
						variant='contained'
						startIcon={<SplitscreenOutlined />}
						disabled={!isValid}
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
						<Typography variant='h6' sx={{ mb: 2 }}>
							Target column
						</Typography>

						<FormControl
							fullWidth
							size='small'
							placeholder='Target column'
							required
							error={!targetColumn}
						>
							<Select
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

							<FormHelperText>
								{!targetColumn && 'Please select target column'}
							</FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Options
						</Typography>

						<Stack spacing={1}></Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default SplitDataUI;
