import { render } from "../../app";
import { messageValidation } from "../../app/validation";
import { Dialog, Input, Label, Link, Title } from "../../components";
import { IDialog, IInput, ILabel, ILink, ITitle } from "../../interfaces";
import { getChats } from "../../utils/chatSelector";


const chatList = getChats()
const title = new Title<ITitle>({
	title: "Мессенджер"
})

const link = new Link<ILink>({
	id: "link",
	link: "Профиль",
	href: "/pages/Profile/index.html",
})

const serchInput = new Input<IInput>({
	type: "text",
	name: "search",
	inputClass: "dialog-message-input",
	placeholder: "Поиск..."
})

const messageInput = new Input<IInput>({
	type: "text",
	name: "message",
	inputClass: "dialog-message-input",
	placeholder: "Введите сообщение...",
	events: {
		blur:  messageValidation,
		submit: messageValidation
	},
	eventInterception: true,
})

const label = new Label<ILabel>({
	name: "label",
	labelClass: "dialog-message-label",
	label: "Ваше сообщение"
})

render<ITitle>('.messenger-title', title)
render<ILink>('.dialog-title', link)
render<IInput>('.dialog-search', serchInput)
render<IInput>('.messenger-input', messageInput)
render<ILabel>('.messenger-chat-detail', label)
chatList.map((item) => {
	const dialog = new Dialog<IDialog>(item)
	render<IDialog>('.dialogs-container', dialog)
})