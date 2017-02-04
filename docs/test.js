group = new THREE.Group();
scene.add(group);//add scene

var program = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, Math.PI*2, true );
	context.fill();
};

var geometry = new THREE.Geometry();//line用の座標保存用

for ( var i = 0; i < 50; i++ ) {
	var material = new THREE.SpriteCanvasMaterial( {
		color: Math.random() * 0x808008 + 0x808080,
		program: program
	} );
	particle = new THREE.Sprite(material);
	//					particle.position.set(0,0,0);//位置
	particle.position.x = Math.random() * 2000 - 1000;
	particle.position.y = Math.random() * 2000 - 1000;
	particle.position.z = Math.random() * 2000 - 1000;
	particle.scale.x = particle.scale.y = Math.random() * 20 + 10;//大きさ
	group.add(particle);
}