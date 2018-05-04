//Base imports
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Custom imports
import {updateTotp} from './functions';
import axios from 'axios';
//importFunctions

//Component class
class TOTP extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: [],
			qr: null,
		};

		this.getQR = this.getQR.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		//setInterval(this.update, 3000);
	}

	async getQR() {
		try {
			return await axios.get('http://chart.apis.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/chris@pagoonstudios.com%3Fsecret%3D' + this.state.value[0] + '%26issuer%3D' + encodeURIComponent('WoA'), { responseType: 'arraybuffer' })
			.then((response) => {
				let image = btoa(
					new Uint8Array(response.data)
						.reduce((data, byte) => data + String.fromCharCode(byte), '')
				);
				const derp = `${image}`;
				this.setState({
					qr: derp.toString(),
				});
			});
		} catch(e) {
			console.log(e);
		}
	}

	update() {
		const secret = 'LIZALAINENPENISLOVERS';

		let values = updateTotp(secret);
		this.setState({
			value: values,
		});

		this.getQR();
	}

	render() {
		return (
			<div>
				<p>Testing QR</p>
				<img src={`data:image/png;base64,${this.state.qr}`} />
				<p />
				<p>{this.state.value[4]}</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TOTP));
