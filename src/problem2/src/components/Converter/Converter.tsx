import { Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import CurrencyService from "../../services/currency-service";
import { ICurrency } from "../../utils/types/ICurrency";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import SwapButton from "../SwapButton/SwapButton";
import "./Converter.scss";
import ConvertationResult from "../ConvertationResult/ConvertationResult";

export const Converter = () => {
  const [prices, setPrices] = useState<ICurrency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [errorCode, setErrorCode] = useState<number>(0);

  useEffect(() => {
    CurrencyService.fetchPrices().then((res) => {
      const filteredPrices: ICurrency[] = [];
      // Just to filter for normal usage
      res.data
        .sort((lc: ICurrency, rc: ICurrency) => {
          const lTime = new Date(lc.date).getTime();
          const rTime = new Date(rc.date).getTime();
          return rTime - lTime;
        })
        .map((currency) => {
          if (
            !filteredPrices.some((filteredPrice) => {
              return filteredPrice.currency === currency.currency;
            })
          ) {
            filteredPrices.push(currency);
          }
        });

      setPrices(filteredPrices);
    });
  }, []);

  const handleSwap = () => {
    const tmpFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tmpFrom);
  };

  const calculateConvertation = () => {
    if (amount <= 0) {
      setErrorCode(1);
      return;
    } else if (fromCurrency.length === 0) {
      setErrorCode(2);
      return;
    } else if (toCurrency.length === 0) {
      setErrorCode(3);
      return;
    }
    const priceFrom = prices.find(
      (price: ICurrency) => price.currency === fromCurrency
    );
    const priceTo = prices.find(
      (price: ICurrency) => price.currency === toCurrency
    );
    if (priceFrom?.price && priceTo?.price) {
      const rate = priceFrom.price / priceTo.price;
      setResult(amount * rate);
    }
  };

  const clear = (code: number)=>{
    setResult(0)
    errorCode === code && setErrorCode(0);
  }
  return (
    <Card sx={{ minWidth: 275 }} className="card">
      <div className="box">
        <TextField
          error={errorCode === 1}
          className="amount"
          label={`Amount of ${fromCurrency}`}
          type="number"
          inputProps={{ min: 0 }}
          onChange={(
            e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setAmount(Number(e.target.value));
            clear(1);
          }}
        />
        <CurrencySelect
          prices={prices}
          currency={fromCurrency}
          label="From"
          setCurrency={setFromCurrency}
          isError={errorCode === 2}
          clearError={() => clear(2)}
        />
        <SwapButton handleSwap={handleSwap} />
        <CurrencySelect
          prices={prices}
          currency={toCurrency}
          label="To"
          setCurrency={setToCurrency}
          isError={errorCode === 3}
          clearError={() => clear(3)}
        />
      </div>
      <Button
        className="convert-button"
        variant="contained"
        onClick={calculateConvertation}
      >
        Convert
      </Button>
      <ConvertationResult
        resultText={`${amount} ${fromCurrency} = ${result} ${toCurrency}`}
        result={result}
        errorCode={errorCode}
      />
    </Card>
  );
};
