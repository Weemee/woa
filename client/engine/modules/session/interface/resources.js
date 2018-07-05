import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newInput} from '../actions';
import {Button} from 'reactstrap';

class Resources extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hover: false,
			resource: '',
			index: '',
		}

		this.table = [
			'H', 'Hydrogen', '1.008', 1, 1,
			'He', 'Helium', '4.0026', 18, 1,
			'Li', 'Lithium', '6.94', 1, 2,
			'Be', 'Beryllium', '9.0122', 2, 2,
			'B', 'Boron', '10.81', 13, 2,
			'C', 'Carbon', '12.011', 14, 2,
			'N', 'Nitrogen', '14.007', 15, 2,
			'O', 'Oxygen', '15.999', 16, 2,
			'F', 'Fluorine', '18.998', 17, 2,
			'Ne', 'Neon', '20.180', 18, 2,
			'Na', 'Sodium', '22.99', 1, 3,
			'Mg', 'Magnesium', '24.305', 2, 3,
			'Al', 'Aluminium', '26.982', 13, 3,
			'Si', 'Silicon', '28.085', 14, 3,
			'P', 'Phosphorus', '30.974', 15, 3,
			'S', 'Sulfur', '32.065', 16, 3,
			'Cl', 'Chlorine', '35.453', 17, 3,
			'Ar', 'Argon', '39.948', 18, 3,
			'K', 'Potassium', '39.098', 1, 4,
			'Ca', 'Calcium', '40.078', 2, 4,
			'Sc', 'Scandium', '44.956', 3, 4,
			'Ti', 'Titanium', '47.867', 4, 4,
			'V', 'Vanadium', '50.942', 5, 4,
			'Cr', 'Chromium', '51.996', 6, 4,
			'Mn', 'Manganese', '54.938', 7, 4,
			'Fe', 'Iron', '55.845', 8, 4,
			'Co', 'Cobalt', '58.933', 9, 4,
			'Ni', 'Nickel', '58.693', 10, 4,
			'Cu', 'Copper', '63.546', 11, 4,
			'Zn', 'Zinc', '65.38', 12, 4,
			'Ga', 'Gallium', '69.723', 13, 4,
			'Ge', 'Germanium', '72.63', 14, 4,
			'As', 'Arsenic', '74.922', 15, 4,
			'Se', 'Selenium', '78.971', 16, 4,
			'Br', 'Bromine', '79.904', 17, 4,
			'Kr', 'Krypton', '83.798', 18, 4,
			'Rb', 'Rubidium', '85.468', 1, 5,
			'Sr', 'Strontium', '87.62', 2, 5,
			'Y', 'Yttrium', '88.906', 3, 5,
			'Zr', 'Zirconium', '91.224', 4, 5,
			'Nb', 'Niobium', '92.906', 5, 5,
			'Mo', 'Molybdenum', '95.95', 6, 5,
			'Tc', 'Technetium', '(98)', 7, 5,
			'Ru', 'Ruthenium', '101.07', 8, 5,
			'Rh', 'Rhodium', '102.91', 9, 5,
			'Pd', 'Palladium', '106.42', 10, 5,
			'Ag', 'Silver', '107.87', 11, 5,
			'Cd', 'Cadmium', '112.41', 12, 5,
			'In', 'Indium', '114.82', 13, 5,
			'Sn', 'Tin', '118.71', 14, 5,
			'Sb', 'Antimony', '121.76', 15, 5,
			'Te', 'Tellurium', '127.6', 16, 5,
			'I', 'Iodine', '126.9', 17, 5,
			'Xe', 'Xenon', '131.29', 18, 5,
			'Cs', 'Caesium', '132.91', 1, 6,
			'Ba', 'Barium', '137.33', 2, 6,
			'La', 'Lanthanum', '138.91', 4, 9,
			'Ce', 'Cerium', '140.12', 5, 9,
			'Pr', 'Praseodymium', '140.91', 6, 9,
			'Nd', 'Neodymium', '144.24', 7, 9,
			'Pm', 'Promethium', '(145)', 8, 9,
			'Sm', 'Samarium', '150.36', 9, 9,
			'Eu', 'Europium', '151.96', 10, 9,
			'Gd', 'Gadolinium', '157.25', 11, 9,
			'Tb', 'Terbium', '158.93', 12, 9,
			'Dy', 'Dysprosium', '162.5', 13, 9,
			'Ho', 'Holmium', '164.93', 14, 9,
			'Er', 'Erbium', '167.26', 15, 9,
			'Tm', 'Thulium', '168.93', 16, 9,
			'Yb', 'Ytterbium', '173.05', 17, 9,
			'Lu', 'Lutetium', '174.97', 18, 9,
			'Hf', 'Hafnium', '178.49', 4, 6,
			'Ta', 'Tantalum', '180.95', 5, 6,
			'W', 'Tungsten', '183.84', 6, 6,
			'Re', 'Rhenium', '186.21', 7, 6,
			'Os', 'Osmium', '190.23', 8, 6,
			'Ir', 'Iridium', '192.22', 9, 6,
			'Pt', 'Platinum', '195.08', 10, 6,
			'Au', 'Gold', '196.97', 11, 6,
			'Hg', 'Mercury', '200.59', 12, 6,
			'Tl', 'Thallium', '204.38', 13, 6,
			'Pb', 'Lead', '207.2', 14, 6,
			'Bi', 'Bismuth', '208.98', 15, 6,
			'Po', 'Polonium', '(209)', 16, 6,
			'At', 'Astatine', '(210)', 17, 6,
			'Rn', 'Radon', '(222)', 18, 6,
			'Fr', 'Francium', '(223)', 1, 7,
			'Ra', 'Radium', '(226)', 2, 7,
			'Ac', 'Actinium', '(227)', 4, 10,
			'Th', 'Thorium', '232.04', 5, 10,
			'Pa', 'Protactinium', '231.04', 6, 10,
			'U', 'Uranium', '238.03', 7, 10,
			'Np', 'Neptunium', '(237)', 8, 10,
			'Pu', 'Plutonium', '(244)', 9, 10,
			'Am', 'Americium', '(243)', 10, 10,
			'Cm', 'Curium', '(247)', 11, 10,
			'Bk', 'Berkelium', '(247)', 12, 10,
			'Cf', 'Californium', '(251)', 13, 10,
			'Es', 'Einstenium', '(252)', 14, 10,
			'Fm', 'Fermium', '(257)', 15, 10,
			'Md', 'Mendelevium', '(258)', 16, 10,
			'No', 'Nobelium', '(259)', 17, 10,
			'Lr', 'Lawrencium', '(266)', 18, 10,
			'Rf', 'Rutherfordium', '(267)', 4, 7,
			'Db', 'Dubnium', '(268)', 5, 7,
			'Sg', 'Seaborgium', '(269)', 6, 7,
			'Bh', 'Bohrium', '(270)', 7, 7,
			'Hs', 'Hassium', '(277)', 8, 7,
			'Mt', 'Meitnerium', '(278)', 9, 7,
			'Ds', 'Darmstadium', '(281)', 10, 7,
			'Rg', 'Roentgenium', '(282)', 11, 7,
			'Cn', 'Copernicium', '(285)', 12, 7,
			'Nh', 'Nihonium', '(286)', 13, 7,
			'Fl', 'Flerovium', '(289)', 14, 7,
			'Mc', 'Moscovium', '(290)', 15, 7,
			'Lv', 'Livermorium', '(293)', 16, 7,
			'Ts', 'Tennessine', '(294)', 17, 7,
			'Og', 'Oganesson', '(294)', 18, 7
		];

		this.setStatus = this.setStatus.bind(this);
		this.setHover = this.setHover.bind(this);
		this.unsetHover = this.unsetHover.bind(this);
		this.reset = this.reset.bind(this);
	}

	setStatus(status, source) {
		this.props.newInput(`setcharacteraction ${status} ${source}`);
	}

	reset() {
		this.props.newInput('resetcharacter');
	}

	tooltipHover() {
		return (
			<div id="tooltipHere" style={{position: 'absolute', width: '50%', height: '28%', backgroundColor: 'rgba(0, 0, 0, 1)', top: '1%', left: '13.5%'}}>	
				Hovering: {this.state.resource}
			</div>
		);
	}

	setHover(res, i) {
		this.setState({
			hover: true,
			resource: res,
			index: i,
		});
	}

	unsetHover() {
		this.setState({
			hover: false,
			resource: '',
			index: '',
		});
	}

	renderElement(res, i) {
		if(i >= 1) {
			i = i * 5;
		}
		const posX = (this.table[i + 3] * (100 / 18) - (100 / 18)).toString() + '%';
		const posY = (this.table[i + 4] * 10 - 10).toString() + '%';
		const gath = this.props.character.actions.current.source === res ? ('rgba(0, 0, 122, 0.6)') : ('rgba(0, 0, 0, 1)');
		const status = this.props.character.actions.current.source === res ? [null, null] : ['gathering', res];

		return (
			<div id={res} key={i} onMouseOut={() => this.unsetHover()} onMouseOver={() => this.setHover(res, i)} onClick={() => this.setStatus(status[0], status[1])} className="periodicElement" style={{backgroundColor: `${gath}`, left: `${posX}`, top: `${posY}`}}>
				<div className="periodicNumber">
					{(i / 5) + 1}
				</div>
				<div className="periodicSymbol">
					{this.table[i]}
				</div>
				<div className="periodicMass">
					{this.table[i + 2]}
				</div>
				<div className="resourceAmount">
					{this.props.character.resources[res].owned}
				</div>
			</div>
		);
	}

	renderTable() {
		const objects = [];

		Object.keys(this.props.character.resources).map((res, index) => {
			if(this.props.character.unlocked.elements[res]) {
				objects.push(this.renderElement(res, index));
			}
		});

		return (
			<div style={{
				width: '5,5555%',
				height: '10%'
			}}>
				{objects}
			</div>
		);
	}

	renderExtra() {
		return (
			<div id="tooltipHere" style={{position: 'absolute', width: '15%', height: '28%', backgroundColor: 'rgba(0, 0, 0, 1)', bottom: '1%', left: '1%'}}>	
				Dark matter: placeholder
				<Button onClick={() => this.reset()}>Reset</Button>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				{
					this.state.hover &&
					this.tooltipHover()
				}
				{this.renderTable()}

				{this.renderExtra()}
			</React.Fragment>
		);
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators({
		newInput,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		character: state.character.selected,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Resources);
