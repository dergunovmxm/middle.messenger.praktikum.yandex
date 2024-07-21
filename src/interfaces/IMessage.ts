export interface IMessage {
  message: string,
  mClass: string,
  chat_id?: number,
  user_id?: number,
  time?: string,
  content?: string
  file?: string
  id?: number,
  is_read?: boolean
  type?: string
}

export interface IDialogUser {
  avatar?: string
  display_name?: string
  id?: number
  login?: string
  role?: string
  second_name?: string
}
  
  