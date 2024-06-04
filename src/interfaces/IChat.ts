export interface IChat {
	id: number;
	title: string;
}

export interface IGetAllChats {
	data: {},
	headers: Record<string, string>;
}

export interface IGetChatById {
	data: {},
	headers: Record<string, string>;
}

export interface ICreateChat {
	data: {
		title: string
	},
	headers: Record<string, string>;
}

export interface IDeleteChat {
	data: {
		chatId: number;
	},
	headers: Record<string, string>;
}

export interface IAddUserToChat {
	data: {
		chatId: number;
		users: number[];
	},
	headers: Record<string, string>;
}

export interface IMessage {
	message: string;
}