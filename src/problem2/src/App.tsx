import {
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.scss";
import { Converter } from "./components/Converter/Converter";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
 
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Typography variant="h1" gutterBottom className="title">
          Crypto Currency Exchanger
        </Typography>
        <Converter />
      </div>
    </ThemeProvider>
  );
}

export default App;
