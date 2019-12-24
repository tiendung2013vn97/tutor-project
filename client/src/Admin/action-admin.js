import * as types from '../Constants/actionType'

// user
export const getUserList = (e) => {
    return {
        type: types.GET_USER_LIST,
		payload: e
    }
}
export const activeUser = () => {
	return {
		type: types.ACTIVE_USER
	}
}

// skill
export const addSkill = () => {
	return {
		type: types.ADD_SKILL
	}
}
export const deleteSkill = () => {
	return {
		type: types.DELETE_SKILL
	}
}

// contract
export const addContract = () => {
	return {
		type: types.ADD_CONTRACT
	}
}
export const deleteContract = () => {
	return {
		type: types.DELETE_CONTRACT
	}
}
export const updateContract = () => {
	return {
		type: types.UPDATE_CONTRACT
	}
}

