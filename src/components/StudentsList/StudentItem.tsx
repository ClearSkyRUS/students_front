import * as React from 'react'

import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	CircularProgress,
	Chip
} from '@material-ui/core'
import {Delete, Edit} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'

import {useActions} from '../../actions'
import * as StudentActions from '../../actions/student'
import {Student, Mark} from '../../model/index'

interface Props {
	student: Student
	onEdit: (student: Student) => void
}

export const StudentsItem = ({student, onEdit}: Props) => {
	const classes = useStyles()
	const studentActions = useActions(StudentActions)
	const [deleting, setDeleting] = React.useState(false)

	const onDelete = () => {
		setDeleting(true)
		studentActions
			.deleteAndRemoveStudent(student)
			.finally(() => setDeleting(false))
	}

	const fio = [student.surname, student.name, student.patronymic].join(' ')
	const birthdate = student.birthdate.split('T')[0]
	const mark = student.mark ? Mark[student.mark] : 'No mark'

	return (
		<ListItem>
			<ListItemText
				primary={fio}
				secondaryTypographyProps={{component: 'div'}}
				secondary={<SecondaryListItemText birthdate={birthdate} mark={mark} />}
			/>
			<ListItemSecondaryAction>
				<IconButton
					edge='end'
					aria-label='edit'
					className={classes.editButton}
					disabled={deleting}
					onClick={() => onEdit(student)}
				>
					<Edit />
				</IconButton>
				<IconButton
					edge='end'
					aria-label='delete'
					className={classes.wrapper}
					disabled={deleting}
					onClick={onDelete}
				>
					<Delete />
					{deleting && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

interface SecondaryListItemTextProps {
	birthdate: string
	mark: string
}

const SecondaryListItemText = ({
	birthdate,
	mark
}: SecondaryListItemTextProps) => {
	const classes = useStyles()
	return (
		<span className={classes.secondaryText}>
			<span>{birthdate}</span>
			<Chip size='small' className={classes.markchip} label={mark} />
		</span>
	)
}

const useStyles = makeStyles({
	wrapper: {
		position: 'relative'
	},

	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	},

	editButton: {
		marginRight: '5px !important' as '5px'
	},

	markchip: {
		width: 'max-content',
		'@media only screen and (min-width: 600px)': {
			marginLeft: 5
		}
	},

	secondaryText: {
		'@media only screen and (max-width: 600px)': {
			display: 'flex',
			flexDirection: 'column-reverse'
		}
	}
})
