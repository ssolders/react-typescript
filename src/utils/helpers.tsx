import { IMerchantDropdownItem, IMerchantDropdownGroup } from './../Components/Header/MerchantDropdown/MerchantDropdown'

const getMerchantMenuItemClass = (isGroup: boolean, level: number): string => {
  if (isGroup) {
    return `parent-mid parent-mid-${level}`
  } else {
    return ''
  }
}

type IMenuList = Array<IMerchantDropdownItem | IMerchantDropdownGroup>

const getMerchantChildren = (merchantData: object, hasParent: boolean, level: number): IMenuList => {
  const subLevel = level + 1
  let merchantTree: any = []
  Object.keys(merchantData).map((index: string, i: number) => {
    const merchant = merchantData[index]
    const hasChildren = merchant.children.length > 0
    merchantTree.push(createMenuItem({ value: merchant.id, label: merchant.name, className: getMerchantMenuItemClass(hasParent, subLevel) }))

    if (hasChildren) {
      merchantTree = [...merchantTree, ...getMerchantChildren(merchant.children, hasChildren, subLevel)]
    }
  })
  return merchantTree
}

export const formatMerchantDataForDropdown = (merchantData: object): IMenuList => {
  const level = 0
  return getMerchantChildren(merchantData, true, level)
}

interface ICreateMenuItem {
  value: string
  label: string
  className?: string
}

const createMenuItem = (props: ICreateMenuItem): IMerchantDropdownItem => {
  const { value, label, className } = props
  return {
    value,
    label,
    className: className
  }
}

const createMenuGroup = (type: string, name: string, items: Array<IMerchantDropdownItem>): IMerchantDropdownGroup => {
  return {
    type,
    name,
    items
  }
}

