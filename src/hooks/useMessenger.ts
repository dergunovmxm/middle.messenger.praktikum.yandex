import { getChatById } from "../api/repositories/messenger"
import { render } from "../app"
import { getFormData } from "../app/formData"
import { Dialog } from "../components"
import { IDialog } from "../interfaces"
import { IMessage } from "../interfaces/IChat"
import { createChatStore, getAllChatsStore } from "../store/messenger"
import { getUserStore } from "../store/user"
import { createWSStore } from "../store/websocket"


export const useMessenger = () => {
	const form = document.querySelector('.messenger-chat')
	const getUserForChat = async () => {
		const user = await getUserStore()
		return user
	}

	const getChatList = async () => {
		const chatList = await getAllChatsStore()
		return chatList
	}

	const sendMessage = (socket: WebSocket) => () => {
		const data = getFormData<IMessage>(form as HTMLFormElement)
		socket.send(JSON.stringify({
			content: data.message,
			type: 'message',
		}))
	}

	//TODO: убрать any
	const onClickChat = (id: number, title: string) => async () => {
		const user: any = await getUserForChat()
		const token = await getChatById(id)
		const socket = await createWSStore(user.id, id, token)

	}

	const onCreateChat = async () => {
		const input = document.querySelector('.dialog-create input') as HTMLInputElement
		const title = input.value
		try {
			const id = await createChatStore(title)
			const dialog = new Dialog<IDialog>({
				title: title,
				className: 'dialog-container',
				events: {
					click: onClickChat(id, title)
				}
			})
			render<IDialog>('.dialogs-container', dialog)
			input.value = ''
		} catch (e) {
			alert('Не удалось создать чат')
		}
	}

	return {
		getUserForChat,
		getChatList,
		onCreateChat,
		onClickChat,
		sendMessage
	}
}