import React from 'react';
import { Spin } from 'antd';

export default class extends React.PureComponent {
    render() {
        return <div id="loading">
            <Spin tip="加载中..." size="large" />
        </div>
    }
}