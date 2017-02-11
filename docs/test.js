function snowflake(points, loop, x_offset,datanum,idx) {
					add_vertex(points[0],datanum,idx);
					for (var p_index=0, p_count=points.length-1; p_index != p_count; ++p_index) {
						var i = next_positions_index-1; // p0 already there
						add_vertex(points[p_index+1],datanum,idx);
						indices_array.push(i, i+1);
					}
				}

				//矩形の生成
				for(var i=0;i<allData.length;i++){
					for(var j=0;j<allData[i].sketchData.lines;j++){
						if(allData[i].sketchData.vertices[j].length!=0){//線が登録されていれば
							snowflake
							(
								allData[i].sketchData.vertices[j],
								false, 600,i,j
							);
						}
					}
					//endpointsを記録する
					sketch_endpoints.push(indices_array.length);
				}