export interface IDialog {
  title: string
  className: string
  events?: Record<string, Function>
  onClick?: Function
}

export interface IDialogItem {
  id: number
  title: string
}

export interface IDialogUserItem {
  login: string
  className: string
  src?: string
  events?: Record<string, Function>
}
