import {NewStudent, Student, StudentActions} from '../model/index'
import {getStudents, createStudent, deleteStudent, patchStudent} from '../api'

export const getAndSetStudents = () => {
	return (dispatch: Function) =>
		getStudents().then(({data}) =>
			dispatch({type: StudentActions.SET_STUDENTS, payload: data})
		)
}

export const createAndAddStudent = (student: NewStudent) => {
	return (dispatch: Function) =>
		createStudent(student).then(({data}) =>
			dispatch({
				type: StudentActions.ADD_STUDENT,
				payload: {...student, _id: data}
			})
		)
}

export const updateStudent = (student: Student) => {
	return (dispatch: Function) =>
		patchStudent(student).then(() =>
			dispatch({
				type: StudentActions.UPDATE_STUDENT,
				payload: student
			})
		)
}

export const deleteAndRemoveStudent = (student: Student) => {
	return (dispatch: Function) =>
		deleteStudent(student).then(() =>
			dispatch({
				type: StudentActions.REMOVE_STUDENT,
				payload: student
			})
		)
}
