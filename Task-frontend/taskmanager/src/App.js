
import './App.css';
import LoginPage from './components/LoginPage';
import {Routes,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import SignupPage from './components/SignupPage';
import MainPage from './components/MainPage';
import TaskPage from './components/TaskPage';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={ <LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/mainpage' element={<MainPage/>}/>
      </Routes>

    </Provider>
    // <MainPage/>
      // <TaskPage/>
     
    
  );
}

export default App;
