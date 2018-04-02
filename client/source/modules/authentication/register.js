import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Card, CardHeader, CardBody, Input, Button, Form, FormGroup} from 'reactstrap';

class AuthRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            strategies: null,
            email: '',
            password: '',
            passwordConfirm: '',
            status: null,
            sending: false,
        };

        this.register = this.register.bind(this);
    }

     register() {
        const state = {...this.state};
    }

    render() {
        return (
            <Card className="card-small">
                Register your penis
            </Card>
        );
    }
};

export default AuthRegister;
