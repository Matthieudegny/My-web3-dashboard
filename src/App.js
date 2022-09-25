//import dependecies
import { BrowserRouter } from 'react-router-dom';

//import context
import DashBoardContext from './Context/Context'

//import components
import SideBar from './components/SideBar/SideBar'
import MainComponent from './pages/MainComponent/MainComponent';

//import style
import "./App.scss"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <DashBoardContext>

          <SideBar/>

          <MainComponent/>

      </DashBoardContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
