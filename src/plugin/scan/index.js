import React from 'react';
import QRCode from 'qrcode';

export default class extends React.PureComponent {
    render() {
        return <div id="scan">
            <canvas id="qrcode" />
            <div className="txt">
                扫一扫登录
            </div>
        </div>
    }
    componentDidMount() {
        this.isShow(this.props.qrcode);
    }

    componentWillReceiveProps(pp) {
        this.isShow(pp.qrcode);
    }

    isShow(qrcode) {
        if (!qrcode) return;
        const canvas = document.getElementById('qrcode')
        QRCode.toCanvas(canvas, qrcode, function (error) {
            if (error) console.error(error)
            console.log('显示二维码!');
        })
    }
}