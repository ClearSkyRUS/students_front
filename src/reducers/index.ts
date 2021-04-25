import {combineReducers} from 'redux'
import {Student} from '../model/index'
import * as studentReducer from './student'

export interface RootState {
	studentsList: Student[]
}

export default () =>
	combineReducers({
		...studentReducer
	})
