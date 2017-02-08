// non-indexed buffer geometry
var geometry = new THREE.BufferGeometry();

// number of triangles
var NUM_TRIANGLES = 10;

// attributes
var positions = new Float32Array( NUM_TRIANGLES * 3 * 3 );
var normals   = new Float32Array( NUM_TRIANGLES * 3 * 3 );
var colors    = new Float32Array( NUM_TRIANGLES * 3 * 3 );
var uvs       = new Float32Array( NUM_TRIANGLES * 3 * 2 );

var color = new THREE.Color();
var scale = 15;
var size = 5;
var x, y, z;

for ( var i = 0, l = NUM_TRIANGLES * 3; i < l; i ++ ) {

	if ( i % 3 === 0 ) {

		x = ( Math.random() - 0.5 ) * scale;
		y = ( Math.random() - 0.5 ) * scale;
		z = ( Math.random() - 0.5 ) * scale;

	} else {

		x = x + size * ( Math.random() - 0.5 );
		y = y + size * ( Math.random() - 0.5 );
		z = z + size * ( Math.random() - 0.5 );

	}

	var index = 3 * i;

	// positions
	positions[ index     ] = x;
	positions[ index + 1 ] = y;
	positions[ index + 2 ] = z;

	//normals -- we will set normals later

	// colors
	color.setHSL( i / l, 1.0, 0.5 );
	colors[ index     ] = color.r;
	colors[ index + 1 ] = color.g;
	colors[ index + 2 ] = color.b;

	// uvs
	uvs[ index     ] = Math.random(); // just something...
	uvs[ index + 1 ] = Math.random();

}

geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

// optional
geometry.computeBoundingBox();
geometry.computeBoundingSphere();

// set the normals
geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry
