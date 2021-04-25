import * as React from 'react'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

import {Typography} from '@material-ui/core'

import App from './App'
import configureStore from './configureStore'

const {persistor, store} = configureStore()

export const ReduxRoot = () => {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<Typography>Loading...</Typography>}
				persistor={persistor}
			>
				<App />
			</PersistGate>
		</Provider>
	)
}
