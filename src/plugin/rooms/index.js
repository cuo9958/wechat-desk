import React from 'react';
import { Row, Col } from 'antd';

export default class extends React.PureComponent {
    render() {
        return <div id="rooms">
            <div className="roomItem active">
                <div className="headimg">
                    <img src="https://pic0.daling.com/img/shop/zin/user/201903/subject_20190327155614.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="title">
                        title
                    </div>
                    <div className="desc">
                        desc
                    </div>
                </div>
                <div className="time">
                    00:15
                </div>
            </div>
            <div className="roomItem">
                <div className="headimg">
                    <img src="https://pic0.daling.com/img/shop/zin/user/201903/subject_20190327155614.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="title">
                        title
                    </div>
                    <div className="desc">
                        desc
                    </div>
                </div>
                <div className="time">
                    00:15
                </div>
            </div>
        </div>
    }
}