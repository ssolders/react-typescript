export interface IMenuItem {
  id: string
  name: string
  subMenuItems?: Array<IMenuItem>
}
