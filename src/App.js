import LandingPage from "./components/environment/LandingPage";
import './index.css';
import './css/atom/toggle.css'
import {useState} from "react";
// import {Provider} from "react-redux";
// import store from "./redux/store";

function App() {

  const [themeSelection, setThemeSelection] = useState(true);
  const theme = themeSelection ? 'dark-theme' : 'light-theme';

  return (
      <div id="page" className={theme}>
          <LandingPage
              themeSelection={themeSelection}
              setThemeSelection={e => setThemeSelection(e.target.checked)}
           />
      </div>
  );
}

export default App;
