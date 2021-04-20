import { FC, useState, useRef, useEffect, Fragment } from 'react'
import ComboboxOption  from './../Combobox/ComboboxItem'
import { IComboboxItem } from './../Combobox/Combobox'


interface IDropdownProps {
  outerClasses: string | null
  outerDropdownClasses: string | null
  anchorType?: string
  anchorContent?: any
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
    window.addEventListener('blur', () => handleClickOutside(false))
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!dropdownOpen) return;

      if (event.key === 'Escape') {
        toggleDropdown(false);
      }
    };

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [dropdownOpen]);

  const toggleDropdown = (show) => {
    setDropdownOpen(show)
  }

  const handleSelect = (option) => {
    setDropdownOpen(false)
    onSelect(option)
  }

  const IconAnchor = () => (
    <div>
      <div onClick={() => toggleDropdown(!dropdownOpen) } className='relative top-1 cursor-pointer flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' id='user-menu' aria-expanded='false' aria-haspopup='true'>
        <span className='sr-only'>Open user menu</span>
          { props.anchorContent() }
      </div>
    </div> 
  )

  const ArrowDown = () => (
    <svg className='inline-block h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
      <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
    </svg>
  )
  
  const MenuAnchor = () => (
    <a
      onClick={() => toggleDropdown(!dropdownOpen) }
      href='#'
      className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
        { props.anchorContent }
        <ArrowDown />
    </a>
  )

  const RenderDropdownAnchor = () => {
    const { anchorType } = props
    switch (anchorType) {
      case 'icon':
        return <IconAnchor />
      case 'menu':
        return <MenuAnchor />
      default:
        return <MenuAnchor />
    }
  }

  useOutsideAlerter(wrapperRef, toggleDropdown.bind(this, false));
  const optionsContainerClasses = 'origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'

  return (
    <div ref={wrapperRef} className={`relative inline-block ${outerClasses}`}>

      { RenderDropdownAnchor() }
      
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
