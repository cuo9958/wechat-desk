import React, { Component } from 'react';
import './App.css';
import { Button, Spin } from 'antd';

import Loading from './plugin/loading';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Loading />
            </div>
        );
    }

    componentDidMount() {
        window.ipc.on('window.ready', (event, arg) => {
            console.log(arg) // prints "pong"
        })
    }

    click() {
        window.ipc.send('asynchronous-message', 'ping')
    }
}

export default App;
