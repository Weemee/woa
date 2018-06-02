//Base imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Custom imports
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

//Component class
class TestThree extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
			height: 0,
			fullscreen: false,
		}

		this.mount = React.createRef('mount');
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.animate = this.animate.bind(this);
	}

	componentDidMount() {
		this.addListeners();

		const width = this.mount.clientWidth;
		const height = (this.mount.clientWidth * 0.5625);
		

		const gridRadius = 128;
		const gridRadials = gridRadius / 4;
		const gridSegments = gridRadius * 2;
		const gridDivisions = 64;

		const sphereRadius = 2;
		const sphereSegments = 16;

		const minZ = sphereRadius * 8; //Determined based on the size of sphereRadius
		const maxZ = gridRadius * 2; //Determined based on the size of gridRadius

		const scene = new THREE.Scene();
		//Takes FoV, Aspect, Near, Far. They all define 'viewing frustum'.
		const camera = new THREE.PerspectiveCamera(
			45,
			width / height,
			1,
			1000
		);
		camera.position.set(
			0,
			minZ / 2,
			minZ
		);

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		const starGeometry = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments);
		const starMaterial = new THREE.MeshBasicMaterial({
			color: '#f7e456',
			wireframe: true
		});

		const planetGeometry = new THREE.SphereGeometry(sphereRadius / 2, sphereSegments, sphereSegments);
		const planetMaterial = new THREE.MeshBasicMaterial({
			color: '#61bff9',
			wireframe: true
		});

		const planetTwoGeometry = new THREE.SphereGeometry(sphereRadius / 2, sphereSegments, sphereSegments);
		const planetTwoMaterial = new THREE.MeshBasicMaterial({
			color: '#ef9bb7',
			wireframe: true
		});

		const center = new THREE.Object3D();
		scene.add(center);
		const star = new THREE.Mesh(starGeometry, starMaterial);
		center.add(star);

		const pivotOne = new THREE.Object3D();
		star.add(pivotOne);
		const planetOne = new THREE.Mesh(planetGeometry, planetMaterial);
		planetOne.position.x = 16;
		pivotOne.add(planetOne);

		const pivotTwo = new THREE.Object3D();
		star.add(pivotTwo);
		const planetTwo = new THREE.Mesh(planetTwoGeometry, planetTwoMaterial);
		planetTwo.position.x = 48;
		pivotTwo.add(planetTwo);

		const gridHelper = new THREE.PolarGridHelper(gridRadius, gridRadials, gridSegments, gridDivisions);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enabled = true;
		controls.maxDistance = maxZ;
		controls.minDistance = minZ;
		
		scene.add(gridHelper);
		scene.add(new THREE.AxesHelper(20));
		renderer.setClearColor('#000000');
		renderer.setSize(width, height);

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.star = star;
		this.planetOne = planetOne;
		this.planetTwo = planetTwo;

		this.mount.appendChild(this.renderer.domElement);
		this.start();
	}

	updateDimensions() {
		if(window.innerWidth < 500) {
			this.setState({
				width: 500,
				height: 500
			});
		}
		else {
			if(this.mount.webkitExistFullscreen) {
				this.setState({
					width: window.innerWidth,
					height: window.innerHeight,
				});
				this.renderer.setSize(this.state.width, Math.round(this.state.width * 0.5625));
			}
			else {
				this.setState({
					width: this.mount.clientWidth,
					height: this.mount.clientHeight,
				});
				this.renderer.setSize(this.state.width, Math.round(this.state.width * 0.5625));
			}
		}
	}

	addListeners() {
    	window.addEventListener('resize', this.updateDimensions.bind(this));
		document.addEventListener('keydown', this.onKeyPress.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
		document.removeEventListener('keydown', this.onKeyPress.bind(this));
		this.stop();
		this.mount.removeChild(this.renderer.domElement);
	}

	onKeyPress(e) {
		if(!this.props.character) {
			return;	
		}
		if(!this.mount.webkitExistFullscreen)
		{
			if (e.keyCode == 13) {
				this.toggleFullscreen();
			}
		}
	}

	toggleFullscreen() {
		if(!this.mount.webkitFullscreenElement) {
			this.mount.webkitRequestFullscreen();
		}
		else {
			if(this.mount.webkitExistFullscreen) {
				this.mount.webkitExistFullscreen();
			}
		}
	}

	start() {
		if(!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate);
		}
	}

	stop() {
		cancelAnimationFrame(this.frameId);
	}

	animate() {
		const time = Date.now() * 0.0005;
		//this.sphere.rotation.x += 0.01;
		this.star.rotation.y += 0.01;
		this.planetOne.rotation.y += 0.02;
		this.planetTwo.rotation.y += 0.01;
		//this.sphere.rotation.z += 0.01;

		this.renderScene();
		this.frameId = window.requestAnimationFrame(this.animate);
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return (
			<div id="sessionCanvas" ref={(mount) => { this.mount = mount }} />
		);
	}
}

function mapStateToProps(state) {
	return {
		character: state.character.selected,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		//getFunctions
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestThree);
