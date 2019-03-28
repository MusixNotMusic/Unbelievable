var BLACK = 'black';
var RED = 'red';

function RbNode(key, left, right, parent, color){
  this.left = left || nil;
  this.right = right || nil;
  this.p= parent || nil;
  this.key = key;
  this.color = color || RED;
} 
var nil = {key: 'nil', color: BLACK };
var T = {root: nil, nil: nil, size: 0};


function left_rotate(T, x){
  var y = x.right;
  x.right = y.left;
  if(y.left !== T.nil){
    y.left.p = x;
  }
  y.p = x.p;
  if(x.p == T.nil){
    T.root = y;
  }else if(x == x.p.left){
    x.p.left = y;
  }else if(x == x.p.right){
    x.p.right = y;
  }
  x.p = y;
  y.left = x;
}

function right_rotate(T, x){
  var y = x.left;
  x.left = y.right;
  if(y.right !== T.nil){
    y.right.p = x;
  }
  y.p = x.p;
  if(x.p == T.nil){
    T.root = y;
  }else if(x == x.p.left){
    x.p.left = y;
  }else if(x == x.p.right){
    x.p.right = y;
  }
  x.p = y;
  y.right = x;
}


function insert(T, z){
  var y = T.nil;
  var x = y =T.root;
 
  while(x !== T.nil){
    y = x;
    if(x.key > z.key){
      x = x.left;
    }else {
      x = x.right
    }
  }
  z.p = y;
  if(y == T.nil){
    T.root = z;
    // return;
  }else if(y.key > z.key){
    y.left = z;
  } else {
    y.right = z;
  }
  // z.p = y;
  z.left = T.nil;
  z.right = T.nil;
  z.color = RED;
  insert_fix(T, z);
}

function insert_fix(T, z){
  while(z.p.color === RED){
    console.log(z);
    if(z.p === z.p.p.left){
      var w = z.p.p.right; //uncle
      if(w.color === RED){
        w.color = BLACK;
        z.p.color = BLACK;
        z.p.p.color = RED;
        z = z.p.p;
      }else{
        if(z.p.right == z){
          z = z.p;
          left_rotate(T, z);
        }
        z.p.p.color = RED;
        z.p.color = BLACK;
        right_rotate(T, z.p.p);
      }
    }else if(z.p === z.p.p.right){
      var w = z.p.p.left; //uncle
      if(w.color === RED){
        w.color = BLACK;
        z.p.color = BLACK;
        z.p.p.color = RED;
        z = z.p.p;
      }else{
        if(z.p.left == z){
          z = z.p;
          right_rotate(T, z);
        }
        z.p.p.color = RED;
        z.p.color = BLACK;
        left_rotate(T, z.p.p);
      }
    }
  }
  T.root.color = BLACK;
}

/**
 * insert 测试
 * @param {*} node 
 * @param {*} deep 
 */ 
function inorder(node, deep){
  if(node === null) {
    return;
  }

  if(node.left){
    deep++;
    inorder(node.left, deep);
    deep--;
  }
  if(node != T.nil){
    console.log(node.key, node.color, deep);
    // deep++;
  }
  if(node.right){
    deep++;
    inorder(node.right, deep);
    deep--;
  }
}

var random = Math.random;

function insertNodes(T){
  for(var i = 100; i > 0; i--){
    insert(T, new RbNode(random()*1000|0));
  }
}

insertNodes(T);
inorder(T.root, 0);