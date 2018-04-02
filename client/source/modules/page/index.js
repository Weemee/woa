import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setMousePos} from '../utils/actions';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    mouseMove(event) {
        this.props.setMousePos(event.clientX, event.clientY);
    }

    render() {
        return (
            <div style={{width:'200px', height:'200px', background:'cyan'}} onMouseMove={(e) => this.mouseMove(e)}>
                <p>Move here and your MouseX: {this.props.pos.x} and MouseY: {this.props.pos.y} will show!</p>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setMousePos,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        pos: {x: state.utils.mousePos.x, y: state.utils.mousePos.y},
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
