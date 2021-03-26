import { FC, useState, useRef, useEffect } from 'react'
import ComboboxOption  from './../Combobox/ComboboxItem'
import { IComboboxItem } from './../Combobox/Combobox'


interface IDropdownProps {
  outerClasses: string | null
  outerDropdownClasses: string | null
  options: Array<IComboboxItem>
  onSelect: (option) => {}
  selected: any | null
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
    // window.addEventListener('blur', () => handleClickOutside(false))
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Dropdown: FC<any> = (props: IDropdownProps) => {
  const wrapperRef = useRef(null);
  const optionsWrapperRef = useRef(null);
  const { options, outerClasses, outerDropdownClasses, selected, onSelect } = props
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (show) => {
    setDropdownOpen(show)
  }

  const handleSelect = (option) => {
    setDropdownOpen(false)
    onSelect(option)
  }

  // const ArrowDown = () => (
  //   <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
  //     <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
  //   </svg>
  // )
  
  // const MenuIcon = () => (
  //   <svg className='-mr-1 ml-2 h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  //     <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  //   </svg>
  // )

  useOutsideAlerter(wrapperRef, toggleDropdown.bind(this, false));
  const optionsContainerClasses = 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'

  return (
    <div ref={wrapperRef} className={`relative inline-block ${outerClasses}`}>
      <div>
        <button onClick={() => toggleDropdown(!dropdownOpen) } type='button' className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' id='user-menu' aria-expanded='false' aria-haspopup='true'>
          <span className='sr-only'>Open user menu</span>
          <img className='h-8 w-8 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
        </button>
      </div>
      
      { dropdownOpen && (
        <div ref={optionsWrapperRef} className={`${optionsContainerClasses} ${outerDropdownClasses}`} role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
          { options.map((option: IComboboxItem, i) => {
            const optionSelected = selected && selected.value === option.value
            return <ComboboxOption key={i} selected={optionSelected} option={option} onSelect={handleSelect} />
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
