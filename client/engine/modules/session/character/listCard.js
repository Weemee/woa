import React from 'react';
import {Card, CardBody} from 'reactstrap';

class ListCard extends React.Component {
	constructor(props) {
		super(props);

		this.selected = this.selected.bind(this);
	}

	selected(name) {
		return {
			name: name,
			type: 'preview',
		};
	}

	render() {
		return (
			<Card className="themeContainer" onClick={() => this.props.onClick(this.selected(this.props.character.name))}>
				<div>
					{this.props.character.name}
				</div>
				<CardBody style={{backgroundColor: `${this.props.color}`}}>
					
				</CardBody>
			</Card>
		);
	}
}

export default ListCard;
