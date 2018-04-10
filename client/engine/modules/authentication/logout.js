import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

class AuthLogout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="card-small">
                <CardHeader>Penis logged out :(</CardHeader>
                <CardBody>
                    <p>We'll miss your penis...</p>
                </CardBody>
            </Card>
        );
    }
};

export default AuthLogout;