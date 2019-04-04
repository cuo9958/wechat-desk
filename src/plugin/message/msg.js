import React from 'react';

export default class extends React.PureComponent {

    static defaultProps = {
        data: {
            fromId: '',
            text: '',
            filename: '',
            type: 0
        }
    }

    render() {
        return <div className="msg">
            <div className="headimg">
                <img src="https://pic0.daling.com/img/shop/zin/user/201903/subject_20190327155614.jpg" alt="" />
            </div>
            <div className="content">
                <div className="nickname">{this.props.data.from.name}</div>
                <div className="txt">
                    {this.props.data.text}
                </div>
            </div>
        </div>
    }
}