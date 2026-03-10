export type SearchableSelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type SearchableSelectProps = {
  id: string;
  label: string;
  value: string;
  options: SearchableSelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  noOptionsText?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};
