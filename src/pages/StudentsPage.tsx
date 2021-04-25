import * as React from 'react'

import {Button, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import {AddOrEditStudentDialog, StudentsList} from '../components'

import {Student} from '../model/index'

export const StudentsPage = () => {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const [editStudent, setEditSudent] = React.useState<Student | null>(null)

	const handleClose = () => {
		setOpen(false)
		setEditSudent(null)
	}

	const handleAddStudent = () => {
		setOpen(true)
	}

	const handleEditStudent = (student: Student) => {
		setEditSudent(student)
		setOpen(true)
	}

	return (
		<Grid container className={classes.root}>
			<AddOrEditStudentDialog
				open={open}
				student={editStudent}
				onClose={handleClose}
			/>
			<Grid item xs={6}>
				<Typography variant='h4' gutterBottom>
					Students
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant='contained'
						color='secondary'
						onClick={handleAddStudent}
					>
						Add Student
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<StudentsList onEdit={handleEditStudent} />
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles({
	root: {
		padding: 20
	},

	buttonContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end'
	},

	button: {
		marginBottom: 15
	}
})
