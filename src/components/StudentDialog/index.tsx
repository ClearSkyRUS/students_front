import * as React from 'react'

import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import {useActions} from '../../actions'
import * as StudentActions from '../../actions/student'
import {Student, NewStudent, Mark} from '../../model/index'

interface Props {
	open: boolean
	student: Student | null
	onClose: () => void
}

const initialState: NewStudent = {
	surname: '',
	name: '',
	patronymic: '',
	birthdate: '2000-01-01',
	mark: null
}

export const AddOrEditStudentDialog = ({open, student, onClose}: Props) => {
	const classes = useStyles()
	const [ready, setReady] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	const [newStudent, setNewStudent] = React.useState(initialState)
	const studentActions = useActions(StudentActions)

	React.useEffect(() => {
		if (open && student) {
			setNewStudent({...student, birthdate: student.birthdate.split('T')[0]})
		}
	}, [open])

	React.useEffect(() => {
		setReady(
			Boolean(newStudent.surname) &&
				Boolean(newStudent.name) &&
				Boolean(newStudent.patronymic) &&
				Boolean(newStudent.birthdate)
		)
	}, [newStudent])

	const handleCreateAndClose = () => {
		setLoading(true)
		const action = student ? 'updateStudent' : 'createAndAddStudent'
		studentActions[action](newStudent)
			.then(handleClose)
			.finally(() => setLoading(false))
	}

	const handleClose = () => {
		if (loading) return
		onClose()
		setNewStudent(initialState)
	}

	const handleChange = (key: string, value: string | number | null) => {
		setNewStudent({...newStudent, [key]: value})
		console.log(newStudent)
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{student ? 'Edit' : 'Add'} a Student</DialogTitle>
			<form className={classes.form} noValidate>
				<TextField
					value={newStudent.surname}
					id='surname'
					label='Surname'
					variant='outlined'
					required
					onChange={(e) => handleChange('surname', e.target.value)}
				/>
				<TextField
					value={newStudent.name}
					id='name'
					label='Name'
					variant='outlined'
					required
					onChange={(e) => handleChange('name', e.target.value)}
				/>
				<TextField
					value={newStudent.patronymic}
					id='patronymic'
					label='Patronymic'
					variant='outlined'
					required
					onChange={(e) => handleChange('patronymic', e.target.value)}
				/>
				<TextField
					value={newStudent.birthdate}
					id='birthdate'
					label='Birthday'
					type='date'
					variant='outlined'
					required
					InputLabelProps={{
						shrink: true
					}}
					onChange={(e) => handleChange('birthdate', e.target.value)}
				/>
				<FormControl variant='outlined'>
					<InputLabel id='mark'>Mark</InputLabel>
					<Select
						value={newStudent.mark || ''}
						id='mark'
						label='Mark'
						onChange={(e) =>
							handleChange('mark', parseInt(e.target.value as string) || null)
						}
					>
						<MenuItem value=''>No mark</MenuItem>
						<MenuItem value={2}>{Mark[2]}</MenuItem>
						<MenuItem value={3}>{Mark[3]}</MenuItem>
						<MenuItem value={4}>{Mark[4]}</MenuItem>
						<MenuItem value={5}>{Mark[5]}</MenuItem>
					</Select>
				</FormControl>
			</form>
			<DialogActions>
				<Button color='primary' disabled={loading} onClick={handleClose}>
					Cancel
				</Button>
				<div className={classes.wrapper}>
					<Button
						color='primary'
						disabled={loading || !ready}
						onClick={handleCreateAndClose}
					>
						{student ? 'Edit' : 'Add'}
					</Button>
					{loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
				</div>
			</DialogActions>
		</Dialog>
	)
}

const useStyles = makeStyles({
	form: {
		marginLeft: 20,
		'& .MuiFormControl-root': {
			margin: 10,
			width: '25ch'
		}
	},

	wrapper: {
		position: 'relative'
	},

	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	}
})
