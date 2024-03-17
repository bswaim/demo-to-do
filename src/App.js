import LandingPage from "./components/environment/LandingPage";
import './index.css';
import './css/atom/toggle.css'
import {useState} from "react";

function App() {

  const [themeSelection, setThemeSelection] = useState(false);
  const theme = themeSelection ? 'dark-theme' : 'light-theme';

  return (
      <div id="page" className={theme}>
          <LandingPage
              themeSelection={themeSelection}
              setThemeSelection={e => setThemeSelection(e)}
           />
      </div>
  );
}

export default App;
