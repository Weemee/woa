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

		this.mount = React.createRef('mount');
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.animate = this.animate.bind(this);
	}

	componentWillMount() {
		document.addEventListener('keydown', this.onKeyPress.bind(this));
	}

	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;

		const gridRadius = 128;
		const gridRadials = gridRadius / 4;
		const gridSegments = gridRadius * 2;
		const gridDivisions = 64;

		const sphereRadius = 2;
		const sphereSegments = 16;

		const minZ = sphereRadius * 8; //Determined based on the size of sphereRadius
		const maxZ = gridRadius * 2; //Determined based on the size of gridRadius

		let stars = [];
		let clock = new THREE.Clock();

		const scene = new THREE.Scene();
		
		//Takes FoV, Aspect, Near, Far. They all define 'viewing frustum'.
		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
		camera.position.set(0, minZ / 2, minZ);
		camera.lookAt(new THREE.Vector3(0, 0, 0,));

		//Create sun
		const Sun = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments),
			new THREE.MeshBasicMaterial({
				color: '#ffff00',
				wireframe: true
			})
		);
		scene.add(Sun);

		//Create planets
		/*const Mercury = this.createPlanet(0.02, 0, 'rgb(124, 131, 203)', 20, 2);
		stars.push(Mercury);

		const Venus = this.createPlanet(0.012, 0, 'rgb(190, 138, 44)', 30, 4);
		stars.push(Venus);

		const Tellus = this.createPlanet(0.010, 0, 'rgb(46, 69, 119)', 40, 2);
		stars.push(Tellus);

		const Mars = this.createPlanet(0.008, 0, 'rgb(210, 81, 16)', 50, 4);
		stars.push(Mars);*/

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		const gridHelper = new THREE.PolarGridHelper(gridRadius, gridRadials, gridSegments, gridDivisions);
		scene.add(gridHelper);
		scene.add(new THREE.AxesHelper(20));

		renderer.setClearColor('#000000');
		renderer.setSize(width, height);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enabled = true;
		controls.maxDistance = maxZ;
		controls.minDistance = minZ;

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.sphereSegments = sphereSegments;
		this.stars = stars;
		this.Sun = Sun;

		this.mount.appendChild(this.renderer.domElement);
		this.start();
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyPress.bind(this));
		this.stop();
		this.mount.removeChild(this.renderer.domElement);
	}

	createPlanet(speed, angle, color, distance, radius) {
		let mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, this.sphereSegments, this.sphereSegments),
			new THREE.MeshLambertMaterial({color})
		);
		mesh.position.x = distance;
		
		let track = new THREE.Mesh(new THREE.RingGeometry(distance - 0.2, distance + 0.2, 64, 1),
			new THREE.MeshLambertMaterial({color: 0x666666, side: THREE.DoubleSide})
		);
		track.rotation.x = - Math.PI / 2;
		this.scene.add(track);

		let star = {
			speed,
			angle,
			distance,
			radius,
			Mesh: mesh
		}

		this.scene.add(mesh);
		return star;
	}

	rotateEachStar(star) {
		star.angle += star.speed;
		if(star.angle > Math.PI * star.distance) {
			star.angle -= Math.PI * star.distance;
		}

		star.Mesh.position.set(star.distance * Math.sin(star.angle), 0, star.distance * Math.cos(star.angle));
	}

	onKeyPress(e) {
		if (e.keyCode == 13) {
			this.toggleFullscreen();
		}
	}

	toggleFullscreen() {
		if (!this.mount.webkitFullscreenElement) {
			this.mount.webkitRequestFullscreen();
		}
		else {
			if (this.mount.webkitExistFullscreen) {
				this.mount.webkitExistFullscreen();
			}
		}
	}

	start() {
		if (!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate);
		}
	}

	stop() {
		cancelAnimationFrame(this.frameId);
	}

	animate() {
		/*this.stars.forEach(star => {
			this.rotateEachStar(star);
		});*/

		this.Sun.rotatation.y = 1;

		this.renderer.render(this.scene, this.camera);
		this.frameId = window.requestAnimationFrame(this.animate);
	}

	render() {
		return (
			<div id="sessionCanvas" ref={(mount) => { this.mount = mount }} />
		)
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TestThree);
