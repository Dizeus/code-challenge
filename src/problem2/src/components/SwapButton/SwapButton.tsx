import { Button } from "@mui/material";
import { FC } from "react";
import "./SwapButton.scss"
interface SortButtonProps {
  handleSwap: ()=>void;
}
const SwapButton:FC<SortButtonProps> = ({handleSwap}) => {
  return (
    <Button variant="text" onClick={handleSwap}>
      <img className="swap-button-image" src="/assets/icon/swap.svg" />
    </Button>
  );
}

export default SwapButton;