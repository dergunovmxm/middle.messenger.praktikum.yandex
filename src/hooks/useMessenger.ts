import { getChatById } from "../api/repositories/messenger"
import { render } from "../app"
import { getFormData } from "../app/formData"
import { Dialog } from "../components"
import { IDialog } from "../interfaces"
import { IMessage } from "../interfaces/IChat"
import { renderDialog } from "../pages/Messenger/Dialog"
import { addUserToChatStore, createChatStore, getAllChatsStore } from "../store/messenger"
import { getUserStore } from "../store/user"
import { callWSStore, createWSStore } from "../store/websocket"


export const useMessenger = () => {
	const form = document.querySelector('.messenger-chat') as HTMLFormElement
	const formAddToChat = document.querySelector('.messenger-add-user') as HTMLFormElement
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
		form?.reset()
	}

	const onAddToChat = (chatId: number) => async () => {
		if (formAddToChat) {
			const { addUser } = getFormData<{ addUser: string }>(formAddToChat as HTMLFormElement)
			try {
				await addUserToChatStore([Number(addUser)], chatId)
				alert('Пользователь добавлен в чат')
			} catch (e) {
				alert('Не удалось добавить пользователя в чат')
			}
		}
	}
	//TODO: убрать any
	const onClickChat = (id: number, title: string) => async () => {
		const user: any = await getUserForChat()
		const token = await getChatById(id)
		const socket = await createWSStore(user.id, id, token)
		callWSStore(socket)
		renderDialog(sendMessage(socket), title, onAddToChat(id))
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