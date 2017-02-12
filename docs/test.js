function loadSketch(data){
	data = data.split(/\r\n|\r|\n/);// 行ごとに分割
	//perse data

	var next = 0;
	for(var i=0;i<data.length;i++){
		var d = data[i].split(' ');

		//行の色
		var c = new THREE.Color(parseInt(d[0]));// color 10進数
		var rgb = c.toArray(); 
		usersSketchData.colors.push(c);

		//線の太さ
		var w = parseInt(d[1]);// 太さ情報
		usersSketchData.lineWidth.push(w);

		var points = [];
		//座標情報
		for(var j=2 ; j<d.length ; j=j+3){
			var px = parseFloat(d[j]);
			var py = parseFloat(d[j+1]);
			var pz = parseFloat(d[j+2]*-1+z0);
			var p = new THREE.Vector3(px,py,pz);

			//頂点情報の書き換え
			var i = next*3;
			usersSketchData.positions_[i] = p.x;
			usersSketchData.positions_[i+1] = p.y;
			usersSketchData.positions_[i+2] = p.z;

			//線の色の書き換え
			usersSketchData.colors_[i] = rgb[0];
			usersSketchData.colors_[i+1] = rgb[1];
			usersSketchData.colors_[i+2] = rgb[2];

			//どの点同士をつなぐか

			if( points.length != 0 )//ストロークの最初の線でなければ
				usersSketchData.indices_array.push(next-1,next);//一つ前の点とつなぐように設定

			points.push(p);
			next++;
		}
		usersSketchData.vertices.push(points);
	}
	usersSketchData.lines = usersSketchData.colors.length;


	usersSketchData.endpoints = usersSketchData.indices_array.length;

	//更新
	usGeometry.addAttribute( 'position', new THREE.BufferAttribute( usersSketchData.positions_ , 3 ) );//構成点
	usGeometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( usersSketchData.colors_ ), 3 ) );//色
	usGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( usersSketchData.indices_array ), 1 ) );//線のつなぎ方を設定
	usGeometry.setDrawRange(0,usersSketchData.endpoints);//表示領域を決める
	renderer.render(scene, camera);
}