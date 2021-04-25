export enum Mark {
	'Unsatisfactory' = 2,
	'Satisfactorily' = 3,
	'Good' = 4,
	'Excellent' = 5
}

export interface NewStudent {
	surname: string
	name: string
	patronymic: string
	birthdate: string
	mark?: Mark | null
}

export interface Student extends NewStudent {
	readonly _id: string
}

export enum StudentActions {
	SET_STUDENTS = 'SET_STUDENTS',
	ADD_STUDENT = 'ADD_STUDENT',
	UPDATE_STUDENT = 'UPDATE_STUDENT',
	REMOVE_STUDENT = 'REMOVE_STUDENT'
}

interface StudentActionType<T, P> {
	type: T
	payload: P
}

export type SetStudentsAction = StudentActionType<string, Student[]>

export type StudentAction = StudentActionType<string, Student>
