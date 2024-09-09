export interface UserLoggedin {
  token: string,
  user: User
}

export interface User {
  id: number,
  userName: string,
  active: boolean,
  role: Role
}

export interface Role {
  id: number,
  role_name: string
}
