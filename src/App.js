import React, { Component, Fragment } from 'react';
import './App.css';
import { Button } from 'antd';

import Loading from './plugin/loading';
import Scan from './plugin/scan';
import Rooms from './plugin/rooms';
import Message from './plugin/message';
import Setting from './plugin/setting';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            qrcode: '',
            list: [],
        }
    }

    render() {
        return (
            <Fragment>
                {/* {this.state.loading && <Loading />} */}
                <Scan qrcode={this.state.qrcode} />
                <div id="main">
                    <Setting />
                    <Rooms list={this.state.list} />
                    <Message />
                </div>
                <Button onClick={this.click.bind(this)}>ateadw</Button>
            </Fragment>
        );
    }

    componentDidMount() {
        // window.ipc.on('ready', () => {
        //     console.log("加载结束")
        //     this.setState({ loading: false });
        // })
        // window.ipc.on('scan', (event, arg) => {
        //     this.setState({ qrcode: arg });
        // });
        // window.ipc.on('login', (event, arg) => {
        //     this.setState({ qrcode: '' });
        // });
        // window.ipc.on('message', (event, arg) => {
        //     console.log("消息", arg)
        // });
        // window.ipc.on('rooms', (event, arg) => {
        //     console.log("房间", arg)
        // });
    }

    click() {
        console.log("点击")
        window.ipc.send('rooms', 'ping')
    }
}

export default App;
