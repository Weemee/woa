//Base imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Custom imports
import * as THREE from 'three';

//Component class
class TestThree extends Component {
	constructor(props) {
		super(props);

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.animate = this.animate.bind(this);
	}

	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		)
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		const geometry = new THREE.SphereGeometry(4, 16, 16);
		const material = new THREE.MeshBasicMaterial({
			color: '#FFFF00',
			wireframe: true
		})
		const sphere = new THREE.Mesh(geometry, material);

		camera.position.z = 12;
		scene.add(sphere);
		renderer.setClearColor('#000000');
		renderer.setSize(width, height);

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.material = material;
		this.sphere = sphere;

		this.mount.appendChild(this.renderer.domElement);
		this.start();
	}

	componentWillUnmount() {
		this.stop();
		this.mount.removeChild(this.renderer.domElement);
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
		this.sphere.rotation.x += 0.01;
		this.sphere.rotation.y += 0.01;
		this.sphere.rotation.z += 0.02;

		this.renderScene();
		this.frameId = window.requestAnimationFrame(this.animate);
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return (
			<div
				style={{ width: '720px', height: '720px' }}
				ref={(mount) => { this.mount = mount }}
			/>
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
