import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {MdBugReport} from 'react-icons/lib/md';
import {Input, InputGroup, Button, Form} from 'reactstrap';

class Feedback extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			temp: '',
		};
	}

	render() {
		return (
			<React.Fragment>
            <Form onSubmit={this.onSubmit}>
            	<InputGroup>
               	<Input
                     onChange={(e) => {
                     	this.setState({temp: e.target.value});
                     }}
                     value={this.state.temp}
                     placeholder="Feedback"
                  />
                  <Button color="themeButton">Send</Button>
               </InputGroup>
            </Form>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		account: state.account.account,
	};
}

export default connect(mapStateToProps)(Feedback);
