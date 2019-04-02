import React, { Fragment } from 'react';
import { Input, Button } from 'antd';
import Scroll from 'react-custom-scroll';

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
                <Scroll keepAtBottom={true} heightRelativeToParent="400px">
                    {this.state.list.map((item, index) => <div key={index}>
                        {item}
                    </div>)}
                </Scroll>
            </div>
            <div className="content_entry">
                <Input.TextArea className="txts" ref="txts" onPressEnter={this.entry.bind(this)} onChange={this.onChange.bind(this)}></Input.TextArea>
                <Button onClick={this.entry.bind(this)} className="enter">Enter</Button>
            </div>
        </div>
    }

    onChange(e) {
        this.setState({
            txts: e.target.value
        });
    }
    entry(e) {
        this.setState({
            list: this.state.list.concat(this.state.txts)
        });
    }
}