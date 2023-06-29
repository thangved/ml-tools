import App from '@/App.tsx';
import '@/index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
