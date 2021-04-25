import * as React from 'react'
import {useSelector} from 'react-redux'

import {List, Paper, Backdrop, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import {StudentsItem} from './StudentItem'

import {useActions} from '../../actions'
import * as StudentActions from '../../actions/student'
import {Student} from '../../model/index'
import {RootState} from '../../reducers/index'

interface Props {
	onEdit: (student: Student) => void
}

export const StudentsList = ({onEdit}: Props) => {
	const [dataLoaded, setDataLoaded] = React.useState(false)
	const classes = useStyles()
	const studentsList = useSelector((state: RootState) => state.studentsList)
	const studentActions = useActions(StudentActions)

	React.useEffect(() => {
		studentActions.getAndSetStudents().finally(() => setDataLoaded(true))
	}, [])

	return (
		<>
			<Paper className={classes.paper}>
				<List>
					{studentsList.map((student: Student) => (
						<StudentsItem key={student._id} student={student} onEdit={onEdit} />
					))}
				</List>
			</Paper>
			<Backdrop className={classes.backdrop} open={!dataLoaded}>
				<CircularProgress />
			</Backdrop>
		</>
	)
}

const useStyles = makeStyles({
	paper: {
		width: '100%',
		minWidth: 260
	},

	backdrop: {
		zIndex: 'auto!important' as 'auto'
	}
})
