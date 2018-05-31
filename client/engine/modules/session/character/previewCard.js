import React from 'react';
import {Card, CardBody, CardTitle, FormGroup, Input, Button} from 'reactstrap';

class PreviewCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			delete: '',
		};

		this.return = this.return.bind(this);
	}

	return(name, type) {
		return {
			name: name,
			type: type,
		};
	}

	render() {
		return (
			<div>
				<Card>
					<CardBody>
						{
							this.props.character &&
							<CardTitle>{this.props.character.name}</CardTitle>
						}
						<Button color='dark' onClick={() => this.props.onClick(this.return(this.props.character.name, 'edit'))}>Edit</Button>
						<br />
						<Button color='blue' onClick={() => this.props.onClick(this.return(this.props.character.name, 'play'))}>Play character</Button>
						<div>
							<br />
							Type in 'DELETE' in the input field to activate the button
						</div>

						<FormGroup>
							<Input
								type="text"
								placeholder="DELETE"
								onChange={(e) => {
									this.setState({
										delete: e.target.value,
									});
								}}
								value={this.state.delete}
							/>
						</FormGroup>
						{
							this.state.delete === 'DELETE' &&
							<Button color='red' onClick={() => this.props.onClick(this.return(this.props.character.name, 'delete'))}>Delete character</Button>
						}
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default PreviewCard;
