export type IChat = {
  id: number;
  title: string;
};

export type IGetAllChats = {
  data: {},
  headers: Record<string, string>;
};

export type IGetChatById = {
  data: {},
  headers: Record<string, string>;
};

export type ICreateChat = {
  data: {
    title: string
  },
  headers: Record<string, string>;
};

export type IDeleteChat = {
  data: {
    chatId: number;
  },
  headers: Record<string, string>;
};

export type IAddUserToChat = {
  data: {
    chatId: number;
    users: number[];
  },
  headers: Record<string, string>;
};

export type IMessage = {
  message: string;
};
