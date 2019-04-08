import React from 'react';
import { Button } from 'antd';
import Content from './content';
import Setting from './setting';

export default class extends React.PureComponent {

    static defaultProps = {
        data: {
            id: '',
            payload: {}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            iset: false,
        }
    }

    render() {
        return <div id="message">
            <header className="header">
                {this.props.data.payload.topic}({this.props.data.payload.memberIdList.length})
                <Button onClick={this.setting.bind(this)} icon="setting"></Button>
            </header>
            {!this.state.iset && <Content id={this.props.data.id} ref="content" />}
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
    // componentWillReceiveProps(pp) {
    //     console.log(pp.data)
    // }
}