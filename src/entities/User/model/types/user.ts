export interface User {
  id: number
  username: string
  avatar?: string
}
export interface UserSchema {
  userData: User | null
  mounted?: boolean
}
