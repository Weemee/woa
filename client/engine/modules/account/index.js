import React from 'react';
import {withRouter, Route, Switch, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Row, Col, Card, CardHeader, ListGroup} from 'reactstrap';

import {getAccountDetails} from './actions';
import {getStrategies} from '../authentication/actions';

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.loggedIn) {
            return this.props.history.push('/authentication');
        }

        this.props.getStrategies();
        this.props.getAccountDetails(this.props.user.id, this.props.authToken);
    }

    render() {
        return (
            <Row>
                <Col sm="3">
                    <Card>
                        <CardHeader>Account</CardHeader>
                        <ListGroup>
                           <NavLink exact to="/account" className="list-group-item">Info</NavLink>
                           {
                              //Stuff
                           }
                           <NavLink exact to="/account/safety" className="list-group-item">Login & Safety</NavLink>
                           {
                              this.props.strategies.find((strategy) => strategy.id !== 'local') &&
                              <NavLink exact to="/account/strategies" className="list-group-item">Linked</NavLink>
                           }
                           {
                              //Stuff
                           }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        );
    }
};

function mapStateToProps(state) {
    return {
        strategies: state.auth.strategies || [],
        user: state.account.user,
        authToken: state.account.authToken,
        loggedIn: state.account.loggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAccountDetails,
        getStrategies,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
