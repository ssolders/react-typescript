import { FC } from 'react'
import { IComboboxItem } from './Combobox'

interface IComboboxProps {
  option: IComboboxItem
  selected: boolean
  onSelect: (option: IComboboxItem) => {}
}

const ComboboxItem: FC<any> = (props: IComboboxProps) => {
  const { option, onSelect, selected } = props
  const { label, value, className } = option
  const activeClasses = selected ? 'bg-green-400' : ''
  return (
    <a id={selected ? 'active-menu-item' : value} onClick={() => onSelect(option)} href='#' className={`${className} ${activeClasses} flex inline-block items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`} role='menuitem'>
      {label}
      
      { selected &&
        <svg className='absolute right-3 -mr-1 ml-2 h-5 w-5 items-end inline-block' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      }

    </a>
  )
}

export default ComboboxItem
