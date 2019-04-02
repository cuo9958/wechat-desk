import React, { Component } from 'react';
import './App.css';
import { Button, Spin } from 'antd';

import Loading from './plugin/loading';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Loading />
                <Button onClick={this.click.bind(this)}>ateadw</Button>
            </div>
        );
    }

    componentDidMount() {
        window.ipc.on('window.ready', (event, arg) => {
            console.log(arg) // prints "pong"
        })
    }

    click() {
        console.log("点击")
        window.ipc.send('test', 'ping')
    }
}

export default App;
