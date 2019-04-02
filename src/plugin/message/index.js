import React, { Fragment } from 'react';
import { Button } from 'antd';
import Content from './content';

export default class extends React.PureComponent {
    render() {
        return <div id="message">
            <header className="header">
                产品技术中心群(288)
                <Button icon="setting"></Button>
            </header>
            <Content />
        </div>
    }
}