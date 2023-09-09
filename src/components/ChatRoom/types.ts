export type T_ChatRoomProps = {
  onLogoutClickHandler: () => void
  userAvatar: string
  username: string
}

export type T_Message = {
  message: string
  username: string
  userAvatar: string
  date: Date
  id: string
}
