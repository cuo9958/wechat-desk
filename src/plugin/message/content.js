import React, { Fragment } from 'react';
import { Input, Button } from 'antd';

export default class extends React.PureComponent {
    render() {
        return <div id="content">
            <div className="content_msg">

            </div>
            <div className="content_entry">
                <Input.TextArea className="txts"></Input.TextArea>
                <Button className="enter">Enter</Button>
            </div>
        </div>
    }
}