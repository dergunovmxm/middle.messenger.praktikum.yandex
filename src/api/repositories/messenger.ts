import { service } from "../fetch"

export const getAllChats = () => {
	const response = service.get(`${URL}/chats`, {
		data: {},
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	}).then((data) => data.map((item) => item))
	console.log('chats', response)
	return response
}