import './App.scss';
import NasaViewer from './Components/NasaViewer/NasaViewer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const requestUrl = 'http://localhost:3001';

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <NasaViewer requestUrl={requestUrl} />
      </div>
    </ThemeProvider>
  );
}

export default App;
