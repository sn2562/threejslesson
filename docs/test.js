geometry = new THREE.Geometry();        

for (var i = 0; i < howmany; i++) {
	var vector = new THREE.Vector3(data[i][0], data[i][2], data[i][1] );
	geometry.vertices.push(vector);
}

attributes = {
	size: { type: 'f', value: [] },
	customColor: { type: 'c', value: [] }
};

uniforms = {
	color: { type: "c", value: new THREE.Color( 0xFFFFFF ) },
	texture: { type: "t", value: THREE.ImageUtils.loadTexture( "js/threejs/examples/textures/sprites/disc.png" ) }
};

var shaderMaterial = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	attributes: attributes,
	vertexShader: document.getElementById( 'vertexshader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
	alphaTest: 0.9,
} );

particles = new THREE.PointCloud( geometry, shaderMaterial );

for (var i = 0; i < howmany; i++) {
	colors[i] = new THREE.Color(RainBowColor(data[i][3], 4));
	sizes[i] = PARTICLE_SIZE * 0.5;
}
scene.add(particles);



//////////


function onDocumentMouseMove(e) {       
	mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
	mouseVector.y = 1 - 2 * (e.clientY / containerHeight);
	var vector = new THREE.Vector3(mouseVector.x, mouseVector.y, 0.5).unproject(camera);
	raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());
	scene.updateMatrixWorld();
	intersects = raycaster.intersectObject(particles);
	console.log(intersects);
}