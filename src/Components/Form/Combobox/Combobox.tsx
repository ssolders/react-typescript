import { FC, useState, useRef, useEffect } from 'react'
import ArrowDown from './../../Misc/ArrowDown'
import ComboboxItem from './ComboboxItem'

export interface IComboboxItem {
  value: string
  label: string
  className?: string
}

interface IComboboxProps {
  outerClasses: string | null
  outerDropdownClasses: string | null
  placeholder?: string
  search: boolean
  scrollToSelected: boolean
  options: Array<IComboboxItem>
  onSelect: (option) => {}
  selected: any | null
  onInput: (value) => {}
  searchValue: string
}

const Combobox: FC<any> = (props: IComboboxProps) => {
  const wrapperRef = useRef(null);
  const optionsWrapperRef = useRef(null);
  const { options, outerClasses, outerDropdownClasses, selected, search, searchValue, onInput, onSelect, scrollToSelected } = props
  const [comboboxOpen, setComboxboxOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [focusedValue, setFocusedValue] = useState(document.getElementById('#active-menu-item'));
  const handleToggleShowCombobox = (show): void => {
    setComboxboxOpen(show)
    setShowSearch(show)
  }

  // custom hook for registering clicks outside to combobox to close it
  useOutsideAlerter(wrapperRef, handleToggleShowCombobox);

  // Scroll to selected mid when opening the combobox
  useEffect(() => {
    if (showSearch && scrollToSelected) {
      setTimeout(() => handleScrollToTarget(optionsWrapperRef), 10)
    }
  }, [showSearch, scrollToSelected])

  // Set up event listnener for clicking escape (to close the combobox)
  useEffect(() => {
    setFocusedValue(document.getElementById('#active-menu-item'))

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleToggleShowCombobox(!comboboxOpen)
          break
        case 'Enter':
          const currentFocusedOption: any = document.querySelector('.focused-menu-item')
          if (currentFocusedOption) {
            currentFocusedOption.click()
          }
          break
        case 'ArrowUp':
        case 'ArrowDown':
          const selected: any = document.querySelector('.focused-menu-item')
          const first = document.querySelector('.comboxbox-item')
          const last = document.querySelectorAll('.comboxbox-item')[document.querySelectorAll('.comboxbox-item').length-1]
          || document.getElementById('active-menu-item')
          
          if (selected === null) {
            if (event.key === 'ArrowUp') {
              last.classList.add('focused-menu-item', 'bg-red-500')
            } else if (event.key === 'ArrowDown') {
              first?.classList.add('focused-menu-item', 'bg-red-500')
            }
            return
          }

          selected.classList.remove('focused-menu-item', 'bg-red-500')
          if (event.key === 'ArrowUp') {
            const previous = selected?.previousElementSibling
            if (previous) {
              previous.classList.add('focused-menu-item', 'bg-red-500')
            } else {
              // no previous exists -> go to the last in the list
              last.classList.add('focused-menu-item', 'bg-red-500')
            }
          } else if (event.key === 'ArrowDown') {
            const next = selected?.nextElementSibling
            if (next) {
              next.classList.add('focused-menu-item', 'bg-red-500')
            } else {
              // no next exists -> go to the first in the list
              first?.classList.add('focused-menu-item', 'bg-red-500')
            }
            
          }
          break
      }
    }

    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comboboxOpen]);

  const handleOptionSelect = (option) => {
    handleToggleShowCombobox(false)
    onSelect(option)
  }

  const optionsContainerClasses = 'origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'

  return (
    <div ref={wrapperRef} className={`relative inline-block ${outerClasses}`}>
      { showSearch && search ? (
        <ComboboxSearch searchValue={searchValue} placeholder={props.placeholder} onInput={onInput} />
      ) : (
        <ComboboxDefault comboboxOpen={comboboxOpen} selected={selected} toggleShowCombobox={handleToggleShowCombobox} />
      )}
      
      { comboboxOpen && (
        <div ref={optionsWrapperRef} className={`${optionsContainerClasses} ${outerDropdownClasses}`} role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
          { options.map((option: IComboboxItem, i) => {
            const optionSelected = selected && selected.value === option.value
            return <ComboboxItem key={i} selected={optionSelected} option={option} onSelect={handleOptionSelect} />
          })}
        </div>
      )}
    </div>
  )
}

export default Combobox

interface IComboboxSearchProps {
  searchValue: string
  placeholder?: string
  onInput: (e) => void 
}
const ComboboxSearch = (props: IComboboxSearchProps) => {
  const { searchValue, placeholder, onInput } = props
  return (
    <div>
      <input
        ref={filterMerchants => filterMerchants && filterMerchants.focus()}
        type='text'
        value={searchValue}
        placeholder={placeholder}
        onChange={onInput}
        className='xl:w-full lg:w-28 lg:h-8 text-left overflow-hidden inline-flex rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:outline-none focus:outline-none' />
    </div>
  )
}

interface IComboboxDefaultProps {
  comboboxOpen: boolean
  selected: any | null,
  toggleShowCombobox: (show: any) => void
}
const ComboboxDefault = (props: IComboboxDefaultProps) => {
  const { comboboxOpen, selected, toggleShowCombobox } = props
  return (
    <button
      onClick={() => toggleShowCombobox(!comboboxOpen)}
      type='button'
      className='xl:w-full lg:w-28 lg:h-8 text-left relative overflow-hidden inline-flex rounded-md border border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
      id='options-menu'
      title={selected.label}
      aria-expanded='true'
      aria-haspopup='true'>
        {selected.label}
        <ArrowDown />
    </button>
  )
}

function handleScrollToTarget (ref  ) {
  const selected: HTMLElement | null = document.getElementById('active-menu-item')
  if (selected) {
    const container: any = ref.current
    if (container) {
      container.scrollTop = selected.offsetTop - 150
    }
  }
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
      // Unbind the event listener on clean up (same as componentWillUnmount)
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
