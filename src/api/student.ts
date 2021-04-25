import {NewStudent, Student} from '../model/index'
import {axios} from '../core'

export const getStudents = () => axios.get('/students')

export const createStudent = (student: NewStudent) =>
	axios.post('/students', student)

export const patchStudent = (student: Student) =>
	axios.patch('/students', student)

export const deleteStudent = (student: Student) =>
	axios.delete('/students', {
		data: {
			_id: student._id
		}
	})
