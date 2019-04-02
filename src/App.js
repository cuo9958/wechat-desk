import React, { Component } from 'react';
import './App.css';
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Button onClick={this.click.bind(this)}>Button</Button>
                <Spin />
            </div>
        );
    }

    click() {
        window.ipc.send('asynchronous-message', 'ping')
    }
}

export default App;
