//sketchlineの生成
indices_array = [];//構成点をどうやってつなぐか
positions_ = [];//構成点群
colors_ = [];//構成線の色情報

var next = 0;
for( var j=0 ; j<allData[0].depthData.points.length ; j++){//全ての線について行う
	//最初の座標
	var p = allData[0].depthData.points[j][0];
	positions_.push(p.x,p.y,p.z);//最初の点を追加する
	//最初の色
	var rgb = allData[0].sketchData.colors[0].toArray();
	colors_.push(rgb[0],rgb[1],rgb[2]);;//最初の色を追加する

	//最初の点以降を全て追加する
	for( var k=1 ; k<allData[0].depthData.points[i].length ; k++ ){//線を構成する最後の点まで参照する
		//座標
		var p = allData[0].depthData.points[j][k];
		positions_.push(p.x,p.y,p.z); //構成点を追加

		//色
		var rgb = allData[0].sketchData.colors[k].toArray();
		colors_.push(rgb[0],rgb[1],rgb[2]);;//最初の色を追加する

		next = next+k;
		indices_array.push( next-1, next );//ひとつ前の登録点とつなぐように設定
	}
	next++;//線の区切り添字を一つ次に飛ばして、前の線と連結されないようにする
}
//データごとの区切りを登録

sketchGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );

//すべてのデータについて、色情報と構成点情報を追加する
var sketchPositions = [];
var sketchColors = [];
for(var i=0;i<allData.length;i++){
	sketchPositions = sketchPositions.concat(allData[i].sketchData.positions_);
	sketchColors = sketchColors.concat(allData[i].sketchData.colors_);
}
