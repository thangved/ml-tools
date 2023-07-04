import { createTheme } from '@mui/material';

const theme = createTheme({
	shape: {
		borderRadius: 20,
	},
	palette: {
		primary: {
			main: '#03045e',
			contrastText: '#fff',
		},
	},
	components: {
		MuiCard: {
			defaultProps: {
				variant: 'outlined',
			},
		},
	},
});

export default theme;
