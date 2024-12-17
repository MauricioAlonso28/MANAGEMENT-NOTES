export interface User {
  email: string,
  password: any
}

export interface UserState {
  user: boolean,
  loading: boolean
  error: string | null
}