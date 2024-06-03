import { IChangePassword, IUser } from "../../interfaces/IUser"
import { service } from "../fetch"
import { URL } from "../url";

export const getUser = () => {
	const response = service.get(`${URL}/auth/user`, {
		data: {},
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	})
		.then((data) => {
			return data
		})
	return response
}

export const changePassword = (data: IChangePassword) => {
	const response = service.put(`${URL}/user/password`, {
		data,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	})

	return response
}

export const updateProfile = (data: IUser) => {
	const response = service.put(`${URL}/user/profile`, {
		data,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	})
	return response
}

export const updateAvatar = (data: FormData) => {
	const response = service.put(`${URL}/user/profile/avatar`, {
		data,
	})
	return response
}