import { FC, useState } from 'react'
import Combobox from './../../Form/Combobox/Combobox'
import { notifyLegacyBo } from '../../../utils/legacyBoApi'
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
  handleSetMerchant: (merchant: IMerchantDropdownItem) => {}
  selectedMerchant: IMerchantDropdownItem
}

const MerchantDropdown: FC<any> = (props: IProps) => {
  // const [selectedMerchant, setSelectedMerchant] = useState(props.merchants[0]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredMerchants, setFilteredMerchants] = useState(props.merchants);

  /* Set selected merchantId */
  if (!props.selectedMerchant) {
    props.handleSetMerchant(props.merchants[0])
  }

  const filterMerchants = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value)
    const filtered = props.merchants.filter(merchant => {
      return merchant.label.includes(e.target.value)
    })
    setFilteredMerchants(filtered)
  }

  const onSelectMerchant = (merchant) => {
    props.handleSetMerchant(merchant)
    setSearchValue('')
    setFilteredMerchants(props.merchants)
    notifyLegacyBo(merchant.value)
  }

  if (props.selectedMerchant === null) return null

  return (
    <div className='inset-y-0 mt-2 flex flex-shrink-1 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
      <Combobox
        outerClasses='-top-1 max-h-96 xl:w-64 lg:56 overflow-y-auto self-center -mt-2'
        outerDropdownClasses='max-h-96 w-96 overflow-y-auto right-12'
        search={true}
        placeholder={'Search name or mID'}
        scrollToSelected={true}
        options={filteredMerchants}
        selected={props.selectedMerchant}
        searchValue={searchValue}
        onSelect={onSelectMerchant}
        onInput={filterMerchants} />
    </div>
  )

}

export default MerchantDropdown
