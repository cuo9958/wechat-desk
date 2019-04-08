import React from 'react';
import { Button } from 'antd';

export default class extends React.PureComponent {
    render() {
        return <div id="setting">
            <div className="menu">

            </div>
            <div className="menu2">
                <Button icon="setting" ghost></Button>
                <Button icon="logout" ghost></Button>
            </div>
        </div>
    }
}