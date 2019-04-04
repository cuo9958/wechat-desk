import React from 'react';
import { Button } from 'antd';
import Content from './content';
import Setting from './setting';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            iset: false,
        }
    }

    render() {
        return <div id="message">
            <header className="header">
                产品技术中心群(288)
                <Button onClick={this.setting.bind(this)} icon="setting"></Button>
            </header>
            {!this.state.iset && <Content ref="content" />}
            {this.state.iset && <Setting />}
        </div>
    }

    setting() {
        this.setState({
            iset: !this.state.iset
        });
    }
    addMessage(obj) {
        if (this.refs.content) {
            this.refs.content.addMessage(obj);
        }
    }
}