export type IDialog = {
  title: string
  className: string
  events?: Record<string, Function>
  onClick?: Function
};

export type IDialogItem = {
  id: number
  title: string
};

export type IDialogUserItem = {
  login: string
  className: string
  src?: string
  events?: Record<string, Function>
};
