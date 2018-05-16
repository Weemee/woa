//Base imports
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Custom imports

//Component class
class TestThree extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				Testing 3D
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		//getProps
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		//getFunctions
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestThree));
