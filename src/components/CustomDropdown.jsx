import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomDropdown.css';

const CustomDropdown = ({
  id,
  name,
  value,
  onChange,
  options,
  label,
  ariaLabel,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Check if click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listeners with a small delay to avoid immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    setIsOpen(false);

    // Create a synthetic event object that matches React's event structure
    const syntheticEvent = {
      target: {
        name,
        value: optionValue,
        type: 'select-one',
      },
      preventDefault: () => {},
      stopPropagation: () => {},
    };

    // Call onChange with the synthetic event
    if (onChange) {
      onChange(syntheticEvent);
    }

    // Sync native select
    const nativeSelect = document.getElementById(id);
    if (nativeSelect) {
      nativeSelect.value = optionValue;
      const changeEvent = new Event('change', { bubbles: true });
      nativeSelect.dispatchEvent(changeEvent);
    }
  };

  // Sync custom dropdown when native select changes (fallback)
  useEffect(() => {
    const nativeSelect = document.getElementById(id);
    if (nativeSelect) {
      const handleNativeChange = (e) => {
        const syntheticEvent = {
          target: {
            name,
            value: e.target.value,
            type: 'select-one',
          },
          preventDefault: () => {},
          stopPropagation: () => {},
        };
        onChange(syntheticEvent);
      };
      nativeSelect.addEventListener('change', handleNativeChange);
      return () => {
        nativeSelect.removeEventListener('change', handleNativeChange);
      };
    }
  }, [id, name, onChange]);

  // Ensure native select value stays in sync with prop value
  useEffect(() => {
    const nativeSelect = document.getElementById(id);
    if (nativeSelect && nativeSelect.value !== value) {
      nativeSelect.value = value;
    }
  }, [id, value]);

  const selectedOption = options.find(opt => opt.value === value) || options[0] || { value: '', label: disabled ? 'Select...' : 'Select an option', icon: null };

  return (
    <div className={`custom-dropdown-wrapper ${isOpen ? 'dropdown-open' : ''} ${className}`} ref={dropdownRef}>
      {/* add the same helper class used by form labels to ensure identical styling */}
      <label htmlFor={id} className="custom-dropdown-label form-label">
        {label}
      </label>

      {/* Native select as fallback - visually hidden but functional */}
      <select
        id={id}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="custom-dropdown-native"
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="">Select...</option>
        )}
      </select>

      {/* Custom styled dropdown */}
      <div className="custom-dropdown">
        <button
          type="button"
          className={`custom-dropdown-button ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={(e) => {
            if (disabled || options.length === 0) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent) {
              e.nativeEvent.stopImmediatePropagation();
            }
            setIsOpen(prev => !prev);
          }}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onKeyDown={(e) => {
            if (disabled || options.length === 0) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(prev => !prev);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span className="custom-dropdown-selected">
            {selectedOption.icon && <span className="dropdown-icon">{selectedOption.icon}</span>}
            {selectedOption.label}
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="dropdown-arrow"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <path
              d="M6 9L1 4h10L6 9z"
              fill="currentColor"
            />
          </motion.svg>
        </button>
        <AnimatePresence mode="wait">
          {isOpen && options.length > 0 && (
            <motion.div
              className="custom-dropdown-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              role="listbox"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className={`custom-dropdown-option ${value === option.value ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.nativeEvent) {
                      e.nativeEvent.stopImmediatePropagation();
                    }
                    handleSelect(option.value);
                  }}
                  whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.06)' }}
                  whileTap={{ scale: 0.98 }}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.icon && <span className="dropdown-icon">{option.icon}</span>}
                  {option.label}
                  {value === option.value && (
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="dropdown-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.18 }}
                    >
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke="var(--gold)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomDropdown;
