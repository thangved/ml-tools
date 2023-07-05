import App from '@/App.tsx';
import '@/index.css';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
