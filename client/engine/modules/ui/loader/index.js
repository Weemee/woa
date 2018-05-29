import React from 'react';
import {connect} from 'react-redux';

class Loader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.loading) {
			return null;
		}

		return (
			<div id="loading">
				<div id="loading-content">
					<div className="loader">
						<div>
							<div>
								<div>

								</div>
							</div>
						</div>
						<p>{this.props.loading.message}</p>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		loading: state.app.loading
	};
}

export default connect(mapStateToProps)(Loader);
