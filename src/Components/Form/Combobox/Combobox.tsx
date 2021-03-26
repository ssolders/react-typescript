import { FC, useState, useRef, useEffect } from 'react'
import ComboboxOption from './ComboboxItem'

export interface IComboboxItem {
  value: string
  label: string
  className?: string
}

interface IComboboxProps {
  outerClasses: string | null
  outerDropdownClasses: string | null
  search: boolean
  scrollToSelected: boolean
  options: Array<IComboboxItem>
  onSelect: (option) => {}
  selected: any | null
  onInput: (value) => {}
  searchValue: string
}

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // Handle clicking outside on an iframe - we can't catch that, so instead we fallback to window.blur, in which case we pass false to always close it
      if (!event) {
        return callback(false)
      }
      if (ref.current && !ref.current.contains(event.target)) {
        callback(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener('blur', () => handleClickOutside(false))
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Combobox: FC<any> = (props: IComboboxProps) => {
  const wrapperRef = useRef(null);
  const optionsWrapperRef = useRef(null);
  const { options, outerClasses, outerDropdownClasses, selected, search, searchValue, onInput, onSelect, scrollToSelected } = props
  const [comboboxOpen, setComboxboxOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleShowCombobox = (show) => {
    setComboxboxOpen(show)
    setShowSearch(show)

    if (show && scrollToSelected) {
      setTimeout(() => {
        console.log('scroll to')
        const selected: HTMLElement | null = document.getElementById('active-menu-item')
        if (selected) {
          const topPos = selected.offsetTop
          console.log('topPos ', topPos)

          const container: any = optionsWrapperRef.current
          if (container) {
            console.log('container - scroll to')
            container.scrollTop = topPos - 150
          }
        }
      }, 10)
    }
  }

  const ArrowDown = () => (
    <svg className='absolute right-3 -mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
      <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
    </svg>
  )
  
  // const MenuIcon = () => (
  //   <svg className='-mr-1 ml-2 h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  //     <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  //   </svg>
  // )

  const ComboboxDefault = () => {
    return (
      <button onClick={() => toggleShowCombobox(!comboboxOpen)} type='button' className='relative items-start inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' id='options-menu' aria-expanded='true' aria-haspopup='true'>
        {selected.label}
        <ArrowDown />
      </button>
    )
  }

  const ComboboxSearch = () => {
    return (
      <div>
        <input
          ref={filterMerchants => filterMerchants && filterMerchants.focus()}
          type='text'
          value={searchValue}
          placeholder='Search'
          onChange={onInput}
          className='items-start inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' />
        <ArrowDown />
      </div>
    )
  }

  const handleOptionSelect = (option) => {
    toggleShowCombobox(false)
    onSelect(option)
  }

  useOutsideAlerter(wrapperRef, toggleShowCombobox);
  const optionsContainerClasses = 'origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'

  return (
    <div ref={wrapperRef} className={`relative inline-block ${outerClasses}`}>
      { showSearch && search ? (
        <ComboboxSearch />
      ) : (
        <ComboboxDefault />
      )}
      
      { comboboxOpen && (
        <div ref={optionsWrapperRef} className={`${optionsContainerClasses} ${outerDropdownClasses}`} role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
          { options.map((option: IComboboxItem, i) => {
            const optionSelected = selected && selected.value === option.value
            return <ComboboxOption key={i} selected={optionSelected} option={option} onSelect={handleOptionSelect} />
          })}
        </div>
      )}
    </div>
  )
}

export default Combobox
