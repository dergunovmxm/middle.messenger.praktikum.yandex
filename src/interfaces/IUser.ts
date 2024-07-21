export interface IUser {
  id: number
  first_name?: string
  second_name?: string
  display_name?: string
  phone?: string
  login?: string
  avatar?: string
  email?: string
}

export interface ICreateUser {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface IUpdateUser {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export interface ILoginUser {
  login: string,
  password: string
}

export interface IChangePassword {
  oldPassword: string,
  newPassword: string
}
