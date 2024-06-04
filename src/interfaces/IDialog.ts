export interface IDialog {
  title: string
  className: string
  events?: Record<string, Function>
}

export interface IDialogItem {
  id: number
  title: string
}
