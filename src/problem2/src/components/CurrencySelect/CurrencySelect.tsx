import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ICurrency } from "../../utils/types/ICurrency";
import { getImageUrl } from "../../utils/helpers/getImageUrl";
import { FC } from "react";
import "./CurrencySelect.scss"

interface CurrencySelectProps {
  prices: ICurrency[];
  currency: string;
  label: string;
  isError: boolean;
  setCurrency: (val: string) => void;
  clearError: ()=>void
}

const CurrencySelect: FC<CurrencySelectProps> = ({
  currency,
  prices,
  label,
  isError,
  setCurrency,
  clearError,
}) => {
  return (
    <FormControl className="select" error={isError}>
      <InputLabel id={`${label.toLowerCase()}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label.toLowerCase()}-label`}
        id={`${label.toLowerCase()}-select`}
        value={currency}
        label={label}
        onChange={(e: SelectChangeEvent) => {
          clearError();
          setCurrency(e.target.value);
        }}
      >
        {prices.map((currency) => (
          <MenuItem value={currency.currency} key={currency.currency}>
            <img className="image" src={getImageUrl(currency.currency)} />
            {currency.currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
