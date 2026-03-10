import { useCallback, useMemo, useState } from 'react';
import { Box, Button, Input, Text } from 'tharaday';
import { useClickOutside } from '../hooks/useClickOutside.ts';
import type { SearchableSelectProps } from '../types/select.ts';

const toStringValue = (value: string | number): string => String(value);

const SearchableSelect = ({
  id,
  label,
  value,
  options,
  onValueChange,
  placeholder,
  noOptionsText = 'No matching options',
  error,
  helperText,
  fullWidth = true,
  disabled = false,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const rootRef = useClickOutside<HTMLDivElement>(handleClose, isOpen);

  const selectedOption = useMemo(
    () => options.find((option) => toStringValue(option.value) === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  const handleSelect = (optionValue: string | number) => {
    onValueChange(toStringValue(optionValue));
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef}>
      <Box display="grid" gap={1} style={{ position: 'relative' }}>
        <Input
          id={id}
          label={label}
          value={isOpen ? query : (selectedOption?.label ?? '')}
          placeholder={placeholder ?? `Search ${label.toLowerCase()}...`}
          onFocus={() => {
            if (!disabled) {
              setIsOpen(true);
              setQuery('');
            }
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
            }
          }}
          error={error}
          helperText={helperText}
          autoComplete="off"
          fullWidth={fullWidth}
          disabled={disabled}
        />

        {isOpen ? (
          <Box
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 20,
              marginTop: 4,
              maxHeight: 220,
              overflowY: 'auto',
              background: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              padding: 6,
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
            }}
          >
            {filteredOptions.length === 0 ? (
              <Text as="p" variant="body-sm" color="subtle" margin={0}>
                {noOptionsText}
              </Text>
            ) : (
              <Box display="grid" gap={1}>
                {filteredOptions.map((option) => {
                  const optionValue = toStringValue(option.value);
                  const isActive = optionValue === value;

                  return (
                    <Button
                      key={`${id}-option-${optionValue}`}
                      type="button"
                      variant={isActive ? 'solid' : 'subtle'}
                      intent={isActive ? 'info' : 'neutral'}
                      disabled={option.disabled}
                      onClick={() => handleSelect(option.value)}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default SearchableSelect;
