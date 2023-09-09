export type T_ChatRoomProps = {
  onLogoutClickHandler: () => void
  username: string
}

export type T_Message = {
  message: string
  username: string
  date: Date
  id: string
}
