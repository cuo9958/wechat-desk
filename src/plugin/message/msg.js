import React, { Fragment } from 'react';

export default class extends React.PureComponent {
    render() {
        return <div className="msg">
            <div className="headimg">
                <img src="https://pic0.daling.com/img/shop/zin/user/201903/subject_20190327155614.jpg" alt="" />
            </div>
            <div className="content">
                <div className="nickname">测试用户</div>
                <div className="txt">
                    {this.props.txt}
                </div>
            </div>
        </div>
    }
}