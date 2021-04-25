import {makeStyles} from '@material-ui/styles'
import * as React from 'react'
import {StudentsPage} from './pages'

const App = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<StudentsPage />
		</div>
	)
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%'
	}
})

export default App
