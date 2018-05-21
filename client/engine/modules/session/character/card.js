import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, Button, Progress} from 'reactstrap';


class CharacterCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className="characterCard">
				<div>
					{this.props.character.name}
				</div>
				<CardBody>
					<Progress color="success" value="12" max="40">
						Health: 12
					</Progress>
					{
						this.props.onSelect &&
						<Button onClick={() => this.props.onSelect(this.props.character.name)}>
							Play
						</Button>
					}
				</CardBody>
			</Card>
		);
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCard);
