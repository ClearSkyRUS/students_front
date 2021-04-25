import {
	Student,
	SetStudentsAction,
	StudentAction,
	StudentActions
} from '../model/index'
import createReducer from './createReducer'

export const studentsList = createReducer<Student[]>([], {
	[StudentActions.SET_STUDENTS](state: Student[], action: SetStudentsAction) {
		return [...action.payload]
	},
	[StudentActions.ADD_STUDENT](state: Student[], action: StudentAction) {
		return [...state, action.payload]
	},
	[StudentActions.UPDATE_STUDENT](state: Student[], action: StudentAction) {
		return state.map((student: Student) =>
			student._id === action.payload._id
				? {...student, ...action.payload}
				: student
		)
	},
	[StudentActions.REMOVE_STUDENT](state: Student[], action: StudentAction) {
		return state.filter(
			(student: Student) => student._id !== action.payload._id
		)
	}
})
