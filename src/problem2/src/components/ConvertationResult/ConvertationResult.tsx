import { Typography } from "@mui/material";
import { FC } from "react";
import "./ConvertationResult.scss"

interface ConvertationResultProps {
  result: number;
  resultText: string;
  errorCode: number;
}
const ConvertationResult: FC<ConvertationResultProps> = ({
  result,
  resultText,
  errorCode,
}) => {
  return (
    <>
      {result > 0 && !errorCode && (
        <div className="result">
          <Typography variant="h5" component="div">
            {resultText}
          </Typography>
        </div>
      )}
    </>
  );
};

export default ConvertationResult