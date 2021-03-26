import { FC, useState } from 'react'
import Combobox from './../../Form/Combobox/Combobox'
import './MerchantDropdown.scss'

export interface IMerchantDropdownItem {
  value: string
  label: string
  className?: string
}

export interface IMerchantDropdownGroup {
  type: string
  name: string,
  items: Array<IMerchantDropdownItem>
}

interface IProps {
  merchants: Array<IMerchantDropdownItem>
}

const MerchantDropdown: FC<any> = (props: IProps) => {
  const [selectedMerchant, setSelectedMerchant] = useState(props.merchants[0]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredMerchants, setFilteredMerchants] = useState(props.merchants);

  const filterMerchants = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value)
    const filtered = props.merchants.filter(merchant => {
      return merchant.label.includes(e.target.value)
    })
    setFilteredMerchants(filtered)
  }

  const onSelectMerchant = (merchant) => {
    setSelectedMerchant(merchant)
    setSearchValue('')
    setFilteredMerchants(props.merchants)
  }

  return (
    <Combobox
      outerClasses='-top-1 max-h-96 w-72 overflow-y-auto self-center -mt-2'
      outerDropdownClasses='max-h-96 w-72 overflow-y-auto'
      search={true}
      scrollToSelected={true}
      options={filteredMerchants}
      selected={selectedMerchant}
      searchValue={searchValue}
      onSelect={onSelectMerchant}
      onInput={filterMerchants} />
  )

}

export default MerchantDropdown
