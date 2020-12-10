import store from "./Redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


let renderAll = (state) => {
    ReactDOM.render(
        <React.StrictMode>

            <BrowserRouter>
                <App state={state}
                     dispatch={store.dispatch.bind(store)}
                />
            </BrowserRouter>

        </React.StrictMode>,
        document.getElementById('root')
    )
};

renderAll(store.getState());
store.subscribe(renderAll);