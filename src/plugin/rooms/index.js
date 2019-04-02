import React from 'react';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }

    render() {
        return <div id="rooms">
            {this.props.list.map((item, index) => <div onClick={this.choose.bind(this, index)}
                className={index === this.state.active ? "roomItem active" : "roomItem"} key={index}>
                <div className="headimg">
                    <img src="https://pic0.daling.com/img/shop/zin/user/201903/subject_20190327155614.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="title">
                        {item.payload.topic}
                    </div>
                    <div className="desc">
                        desc
                    </div>
                </div>
                <div className="time">
                    00:15
                </div>
            </div>)}
        </div>
    }

    choose(active) {
        this.setState({ active });
    }
}