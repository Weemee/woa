import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'reactstrap';

class Notes extends React.Component {
    constructor(props) {
        super(props);
    }

    getType() {
        let type = this.props.notes.type || 'info';

        // convert to react-strap "error" class name, "danger"
        if (type === 'error') {
            type = 'danger';
        }

        return type;
    }

    render() {
        if (!this.props.notes) {
            return null;
        }

        return (
            <Alert color={this.getType()}>{this.props.notes.message}</Alert>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.app.notes,
    };
}

export default connect(mapStateToProps)(Notes);
