import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Table} from 'reactstrap';

class Players extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Table striped size="sm">
				<tbody>
					{
						this.props.players.map((player, index) => {
							return (
								<tr key={index}>
									<td>
										<div>
											{player.name}
										</div>
									</td>
								</tr>
							);
						})
					}
				</tbody>
			</Table>
		);
	}
}

function mapStateToProps(state) {
	return {
		players: [...state.session.players],
		character: state.character.selected,
	};
}

export default connect(mapStateToProps)(Players);
