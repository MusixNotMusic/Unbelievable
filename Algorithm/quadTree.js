/**
 * A(x1,y1)
 *  +------------------+
 *  |________|_________|
 *  |        | m       |  
 *  +------------------+ B(x2, y2)
 *                  
 * */ 
var maxLen = 10;
// const TL = 0;
// const TR = 1;
// const DL = 2;
// const DR = 3;
function QuadNode(x1, y1, x2, y2){
  this.deep = 0;
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.TL_Node = null; // top left
  this.TR_Node = null; // top right
  this.DL_Node = null; // down left
  this.DR_Node = null; // down right
  this.leaves = [];
}
// 初始化
function QuadTree(x1, y1, x2, y2){
  this.root = new QuadNode(x1, y1, x2, y2);
}

function findNext(coordinate, node){
  var xm = (node.x2 + node.x1) / 2 ;
  var ym = (node.y2 + node.y1) / 2 ;
  var vectorX = coordinate[0] - xm;
  var vectorY = coordinate[1] - ym;
  var _quad;
  var _cood;
  if(vectorX === 0 && vectorY === 0) return null;
  // var _direction;
  // console.log(xm, ym, vectorX, vectorY);
  if(vectorX < 0 && vectorY < 0){ //左上
    _cood = [node.x1, node.y1, xm, ym];
    if(!node.TL_Node){
      node.TL_Node = new QuadNode(_cood[0],_cood[1],_cood[2],_cood[3]);
      node.TL_Node.deep = node.deep+1;
    }
    _quad = node.TL_Node 
  }else if(vectorX >= 0 && vectorY < 0){//右上
    _cood = [xm, node.y1, node.x2, ym];
    if(!node.TR_Node){
      node.TR_Node = new QuadNode(_cood[0],_cood[1],_cood[2],_cood[3]);
      node.TR_Node.deep = node.deep+1;
    }
    _quad = node.TR_Node
  }else if(vectorX < 0 && vectorY >= 0){// 左下
    _cood = [node.x1, ym, xm, node.y2];
    if(!node.DL_Node){
      node.DL_Node = new QuadNode(_cood[0],_cood[1],_cood[2],_cood[3]);
      node.DL_Node.deep = node.deep+1;
    }
    _quad = node.DL_Node;
  }else if(vectorX >= 0 && vectorY >= 0){//右下
    _cood = [xm, ym, node.x2, node.y2];
    if(!node.DR_Node){
      node.DR_Node = new QuadNode(_cood[0],_cood[1],_cood[2],_cood[3]);
      node.DR_Node.deep = node.deep+1;
    }
    _quad = node.DR_Node 
  }
  
  // if(_quad.deep <= 1000){
  //   console.log('coordinate',coordinate ,xm, ym, vectorX, vectorY);
  //   // throw new Error(' break down');
  // }else{
  //   console.log('_quad',_quad);
  //   throw new Error(' break down');
  // }
  // console.log('deep', _quad.deep);
  return _quad;
}

/**
 * 
 * @param {*} coordinate 
 * @param {*} node 
 * 
 *  将一个坐标设置到 three 内部
 * 1、插入一个坐标, 边界检测， root 范围内部 
 * 2、从root开始
 *  2.1 如果root leaves中 没有超出最大长度maxLen
 *      插入到队列中
 *  2.2 如果 root leaves = null, 判断 坐标的 向量
 *      根据向量位置 选择 子节点
 *  2.3 如果 坐标加入 到leaves 中正好 >maxLen
 *      进行分裂
 */
function add(coordinate, node){
  if(!node) return;
  // console.log('coord ==>', coordinate);
  // 叶子长度 小于 最大阀值
  if(node.leaves === null){ // node.leaves 可能为null
    var _node = findNext(coordinate, node);
    add(coordinate, _node);
  }else if(node.leaves.length < maxLen){
    node.leaves.push(coordinate);
  }else if(node.leaves.length == maxLen){
    node.leaves.push(coordinate);
    split(node);
  }
}

function split(node){
  // console.log('split');
  var _leaf;
  while(_leaf = node.leaves.pop()){
    var _nextNode = findNext(_leaf, node);
    add(_leaf, _nextNode);
  }
  node.leaves = null;
}

function boundary(coordinate, node){
    if( coordinate[0] >= node.x1 
       && coordinate[0] <= node.x2 
       && coordinate[1] >= node.y1
       && coordinate[1] <= node.y2)
       return true; //坐标不在 范围内部
    return false
}
// }

function traverse(node, rect, dot){
    if(!node) return dot;
    var $1 = node.TL_Node;
    var $2 = node.TR_Node;
    var $3 = node.DL_Node;
    var $4 = node.DR_Node;
    rect.push([node.x1,node.y1, node.x2, node.y2]);
    if(!node.leaves){
       _dot = traverse($1, rect, dot);
       _dot = traverse($2, rect, _dot);
       _dot = traverse($3, rect, _dot);
       _dot = traverse($4, rect, _dot);
       return _dot;
    }else{
      // console.log('dot dot', dot);
      dot = dot.concat(node.leaves);
      return dot;
    }
}



// var x1 = 0, y1 =0, x2 = 400, y2 = 400;
// var root = new QuadNode(x1, y1, x2, y2);

// function randomCoord(x1, y1, x2, y2){
//    var x = Math.random()*(x2-x1) + x1;
//    var y = Math.random()*(y2-y1) + y1;
//    return [x | 0,y | 0];
// }
// for(var i = 0; i < 10000; i++){
//   var _coord = randomCoord(x1, y1, x2, y2);
//   add(_coord, root);
//   // console.log('root ===>',root);
// }
// console.log('root ===>',root);



