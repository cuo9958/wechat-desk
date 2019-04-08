import React, { Fragment } from 'react';
import { Input } from 'antd';
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
                    {this.state.list.map((item, index) => <Fragment key={index}>
                        <Msg data={item} />
                    </Fragment>)}
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
        window.ipc.send('msg', this.props.id, this.state.txts)
        this.setState({
            txts: ''
        });
    }
    addMessage(obj) {
        if (!obj.room) return;
        if (obj.room.id === '') return;
        this.setState({
            list: this.state.list.concat(obj)
        });
    }
}