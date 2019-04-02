import React, { Component } from 'react';
import './App.css';
import { Button, Spin } from 'antd';

import Loading from './plugin/loading';
import Scan from './plugin/scan';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            qrcode: ''
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.loading && <Loading />}
                <Scan qrcode={this.state.qrcode} />
                <Button onClick={this.click.bind(this)}>ateadw</Button>
            </div>
        );
    }

    componentDidMount() {
        window.ipc.on('ready', () => {
            console.log("加载结束")
            this.setState({ loading: false });
        })
        window.ipc.on('scan', (event, arg) => {
            console.log(arg)
            this.setState({ qrcode: arg });
        })
    }

    click() {
        console.log("点击")
        window.ipc.send('test', 'ping')
    }
}

export default App;
