import { Slider } from 'tharaday';
import type { SliderValue } from 'tharaday';

export type NutritionSliderProps = {
  id: string;
  label: string;
  value: [number, number];
  max: number;
  onValueChange: (value: SliderValue) => void;
};

const toRangeSummary = (range: [number, number], maxBound: number): string =>
  `Min: ${range[0]} | Max: ${range[1]} (bounds: 0-${maxBound})`;

export const NutritionSlider = ({ id, label, value, max, onValueChange }: NutritionSliderProps) => (
  <Slider
    id={id}
    label={label}
    min={0}
    max={max}
    step={1}
    showValue
    helperText={toRangeSummary(value, max)}
    fullWidth
    value={value}
    onValueChange={onValueChange}
  />
);
