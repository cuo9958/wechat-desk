import React, { Component, Fragment } from 'react';
import './App.css';

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
                {this.state.loading && <Loading />}
                <Scan qrcode={this.state.qrcode} />
                <div id="main">
                    <Setting />
                    <Rooms list={this.state.list} />
                    {this.state.list.length > 0 && <Message data={this.state.list[0]} ref="message" />}
                </div>
                {/* <Button onClick={this.click.bind(this)}>ateadw</Button> */}
            </Fragment>
        );
    }

    componentDidMount() {
        window.ipc.on('ready', () => {
            console.log("加载结束")
            this.setState({ loading: false });
        })
        window.ipc.on('scan', (event, arg) => {
            this.setState({ qrcode: arg });
        });
        window.ipc.on('login', (event, arg) => {
            this.setState({ qrcode: '' });
        });
        window.ipc.on('logout', (event, arg) => {
            console.log("登出")
        });
        window.ipc.on('message', (event, arg) => {
            console.log("消息", arg)
            if (this.refs.message) {
                this.refs.message.addMessage(arg);
            }
        });
        window.ipc.on('rooms', (event, arg) => {
            console.log("房间", arg)
            this.setState({ list: arg });
        });
        window.ipc.on('wechat.ready', (event, arg) => {
            console.log("wechat.ready")
        });
        window.ipc.on('wechat.error', (event, arg) => {
            console.log("error", arg)
        });
        window.ipc.on('heartbeat', (event, arg) => {
            console.log("heartbeat", arg)
        });
        setInterval(() => {
            window.ipc.send('rooms');
        }, 5000);
    }

    click() {
        console.log("点击")
        window.ipc.send('rooms', 'ping')
    }
}

export default App;
