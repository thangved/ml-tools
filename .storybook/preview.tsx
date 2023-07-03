import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import React from 'react';
import theme from '../src/theme';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export const withMuiTheme = (Story: any) => (
	<ThemeProvider theme={theme}>
		<Story />
	</ThemeProvider>
);

export default preview;

export const decorators = [withMuiTheme];
