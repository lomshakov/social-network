import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import News from "./Components/News/News";
import {BrowserRouter, Route} from "react-router-dom";

const App = (props) => {
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar state = {props.state.sidebar}/>
                <div className='app-wrapper-content'>
                    <Route path='/profile'
                           render={() => <Profile
                           state={props.state.profilePage}
                           dispatch={props.dispatch}/>} />
                    <Route path='/dialogs'
                           render={() => <Dialogs
                           state={props.state.messagePage}
                           dispatch={props.dispatch}/>}/>
                    <Route path='/news'
                           render={() => <News />}/>
                    <Route path='/music'
                           render={() => <Music />}/>
                    <Route path='/settings'
                           render={() => <Settings />}/>
                </div>
            </div>
    );
}

export default App;
