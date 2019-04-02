import React from 'react';
import { Input, Button } from 'antd';
import Msg from './msg';

export default class extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            txts: ''
        }
    }

    render() {
        return <div id="content">
            <div className="content_msg">
                <div className="scroll" ref="scroll">
                    {this.state.list.map((item, index) => <div key={index}>
                        <Msg txt={item} />
                    </div>)}
                </div>
            </div>
            <div className="content_entry">
                <Input.TextArea value={this.state.txts} className="txts" ref="txts" onPressEnter={this.entry.bind(this)} onChange={this.onChange.bind(this)}></Input.TextArea>
                {/* <Button onClick={this.entry.bind(this)} className="enter">Enter</Button> */}
            </div>
        </div>
    }

    onChange(e) {
        this.setState({
            txts: e.target.value
        });
    }
    entry(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.state.txts == '') return;
        this.setState({
            list: this.state.list.concat(this.state.txts),
            txts: ''
        }, () => {
            this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
        });
    }
}