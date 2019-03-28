
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
// var nil = {key: 'nil' };
var T = {root: nil, nil: nil, size: 0};

function tree_minimum(node){
  while(node.left !== T.nil){
    node = node.left;
  }
  return node;
}

function left_rotate(T, x){
  var y = x.right;
  x.right = y.left;
  if(y.left != T.nil){
    y.left.p = x;
  }
  y.p = x.p;
  if(x.p == T.nil){
    T.root = y;
  }else if(x == x.p.right){
    x.p.right = y;
  }else {
    x.p.left = y;
  }
  y.left = x;
  x.p = y;
}
/**
 * 基于二叉树
 * @param {*} x 
 */ 

function right_rotate(T, x){
  var y = x.left;
  x.left = y.right;
  if(y.right != T.nil){
    y.right.p = x;
  }
  y.p = x.p;
  if(x.p == T.nil){
    T.root = y;
  }else if( x.p.right == x){
    x.p.right = y;
  }else {
    x.p.left = y;
  }
  y.right = x;
  x.p = y;
}
/**
 * 把 z 节点插入到 最深处
 * @param {*} T 
 * @param {*} z 
 */
function rb_insert(T, z){
  var y = T.nil;
  var x = T.root;
  while(x != T.nil){
    y = x;
    if(z.key < x.key){
      x = x.left;
    }else{
      x = x.right;
    }
  }
  z.p = y;
  if(y == T.nil){
    T.root = z;
  }else if(z.key < y.key){
    y.left = z;
  }else{
    y.right = z;
  }
  z.left = T.nil;
  z.right = T.nil;
  z.color = RED;
  T.size++;
  rb_insert_fixup(T,z);
}

function rb_insert_fixup(T,z){
  // console.log('rb_insert_fixup', z);
  while( z.p.color === RED){
    if(z.p === z.p.p.left){
      var y = z.p.p.right; //uncle
      if(y.color === RED){
        z.p.color = BLACK; // parent
        y.color = BLACK;  // uncle
        z.p.p.color = RED; //grandparent
        z = z.p.p;
      }else {
        if(z === z.p.right){
          z = z.p;
          left_rotate(T, z);
        }
        z.p.color = BLACK;
        z.p.p.color = RED;
        right_rotate(T, z.p.p);
      }
    }else if(z.p === z.p.p.right){
      var y = z.p.p.left;
      if(y.color === RED){
        z.p.color = BLACK;
        y.color = BLACK;
        z.p.p.color = RED;
        z = z.p.p;
      }else{
        if(z === z.p.left){
          z = z.p;
          right_rotate(T, z);
        }
        z.p.color = BLACK;
        z.p.p.color = RED;
        left_rotate(T, z.p.p);
      }
    }
  }
  T.root.color = BLACK;
}

function rb_transplant(T, u, v){
  if(u.p === T.nil){
    T.root = v;
  }else if(u === u.p.left){
    u.p.left = v;
  }else {
    u.p.right = v;
  }
  // T.nil
  // if(v !== T.nil){
    v.p = u.p; // v可能是 nil 或者 null
  // }
}
/**
 * 1、z.left  或 z.right 为空时， 过z的黑高 必须一致 所以最多 另一端是 红色 + nil
 * @param {*} T 
 * @param {*} z 
 */
function rb_delete(T, z){
  var y = z;
  var x;
  var y_origin_color = y.color;
  console.log('\n\n\n');
  console.log('[print] 删除目标 ==>', z);
  if(z.left === T.nil){
    x = z.right;
    console.log('z 左节点为空');
    console.log('[delete] z.right 替换 z', z);
    rb_transplant(T, z, z.right);
  }else if(z.right === T.nil){
    x = z.left;
    console.log('z 右节点为空');
    console.log('[delete] z.left 替换 z', z);
    rb_transplant(T, z, z.left);
  }else{
    y = tree_minimum(z.right);
    y_origin_color = y.color;
    x = y.right;
    /**
     * y === z.right
     * y 是 z的有孩子
     */
    if(y.p === z){
      x.p = y;
    }else{ 
      /**
       * y是 z的最左子节点
       * y.right 替换 y
       * y 接替 z 有孩子的信息
       */
      rb_transplant(T, y, y.right);
      y.right = z.right;
      y.right.p = y;
    }
    console.log('test ===========>', x === z.right);
    rb_transplant(T, z, y);  // y 替换 z
    console.log('z 左右节点不为空 ',  y_origin_color);
    console.log('[delete] y 替换 z', y);
    console.log('[delete] x 替换 y', x)
    y.left = z.left;
    y.left.p = y;
    y.color = z.color;
  }
  T.size--; // size 减少
  if(y_origin_color === BLACK){
    // if(x === T.nil){
    //  rb_delete_fixup(T, x.p);
    // }else{
     rb_delete_fixup(T, x);
    // }
  }
}

function rb_delete_fixup(T, x){
  // 如果 x.color = RED 将 x 染成 BLACK 不影响黑高
  console.log('[fix] 修复对象', x);
  console.log('[fix] 当前root', T.root);
  var w;
  while( x != T.root && x.color === BLACK){
    if(x === x.p.left){
    w = x.p.right;
    //  console.log('[x, w]', x, w);
    console.log('[x, w]', x.p.key, w.p.key, x.p === w.p);
     console.log('[blackhight] x黑高', blackHight(x));
     console.log('[blackhight] w黑高',  blackHight(w));
    //  if(x == T.nil) break;
      /**
       *  情况1、 如果 w(x的兄弟节点是黑色)，x黑高 + 1 = w黑搞
       *         x最坏情况是 只有叶子节点 nil
       *         那么 w子节点 必定有 左右子节点(非叶子节点 nil)
       *         所以旋转 x.p 时候 x一定会有一个 来自 w自己点的
       *         兄弟节点
       *  目的: x 有一个黑色兄弟
       *  */ 
      if(w.color === RED){
        w.color = BLACK;
        x.p.color = RED;
        left_rotate(T, x.p);
        w = x.p.right;
      }
      /**
       *  情况2、当w(兄弟节点)的左右孩子都是黑色时候
       *        从w到到最下面的叶子节点的黑高都是一样的，条件5满足
       *        将w设置为 RED 红色 可以将x 的黑高于w黑高相等， 修复
       *        条件5，同时x.p 如果是黑色无需处理，满足条件2，黑色根，
       *        如果是红色根，x = x.p 在下一次 迭代中 跳出循环，并在
       *        结尾设置x.p 为黑色;
       * 
       *        如果 执行情况1 会将把w.color = black
       *        如果不执行 w.color 原来就是黑色
       * 
       *  目标: 左右黑高相同
       */
        console.log('guest ', x.color, w);
        if(w.left.color === BLACK && w.right.color === BLACK){
          w.color = RED;
          x = x.p;
        }else{
          /**
           *  情况3、w(兄弟节点)的左孩子 是红色，根据条件4,
           *  w节点必定是黑色节点，满足红黑树性质，通过右旋转
           *  将左孩子转变为w的父亲，x就有一个 红色的兄弟节点
           * 
           *  目的: 可以进行 情况4操作
           */
          if(w.right.color === BLACK){
            w.left.color = BLACK;
            w.color = RED;
            right_rotate(T, w);
            w = x.p.right;
          }
          /**
           *  情况4、当w为黑色，无论x的父亲节点是什么颜色，
           *  将原来的x.p染色为 黑色，将w 替换为原来 x.p的位置 
           *  w.color 为父类的颜色， w.right.color 颜色为黑色 保证右侧黑高
           *  可以通过坐旋转将 父节点转移到左侧，增加x 侧的黑高，修复 条件5
           *          
           * */
          w.color = x.p.color;
          x.p.color = BLACK;
          // w.color = x.p.color;
          w.right.color = BLACK;
          left_rotate(T, x.p);
          x = T.root;
        }
     
    } else if(x === x.p.right){
      w = x.p.left;
      console.log('[x, w]', x.p.key, w.p.key, x.p===w.p);
      console.log('[blackhight] x黑高', blackHight(x));
      console.log('[blackhight] w黑高',  blackHight(w));
      // if(x == T.nil) break;

      if(w.color === RED){
        w.color = BLACK;
        x.p.color = RED;
        right_rotate(T, x.p);
        w = x.p.left;
      }
      
      if(w.right.color === BLACK && w.left.color === BLACK){
        w.color = RED;
        x = x.p;
      } else {
        if(w.left.color === BLACK){
          w.right.color = BLACK;
          w.color = RED;
          left_rotate(T, w);
          w = x.p.left;
        }
        // try{
         console.log('[Debug] #293 ', x, w);
         w.color = x.p.color;
        // }catch(e){
        //   console.log('w==>',w);
        //   throw Error(e);
        // }
        x.p.color = BLACK;
        w.left.color = BLACK;
        right_rotate(T,x.p);
        x = T.root;
      }
    }
  }
  x.color = BLACK;
}

function find_node(T, key){
  var t_node = T.root;
  while(t_node != T.nil){
    if(t_node.key > key){
      t_node = t_node.left;
    }else if(t_node.key < key){
      t_node = t_node.right;
    }else if(t_node.key = key){
      return t_node;
    }
  }
  return null;
}

var i = 0;
var nodes = [];
var links = [];
function inorder(node, deep, wU, hU){
  if(node === T.nil) {
    return;
  }

  if(node.left){
    deep++;
    inorder(node.left, deep, wU, hU);
    deep--;
  }
  if(node != T.nil){
    // node.h = h * deep;
    // node.w =
    i++
    node.y = deep * hU;
    node.x = i * wU;
    nodes.push(node);
    if(node.p != T.nil){
      links.push({src: node, dist: node.p});
    }
    // console.log(node.key, node.color, deep, i);
    // deep++;
  }
  if(node.right){
    deep++;
    inorder(node.right, deep, wU, hU);
    deep--;
  }
}




var random = Math.random;

function insertNodes(T, size){
  for(var i = size; i > 0; i--){
    rb_insert(T, new RbNode(random()*1000|0));
  }
}

/**
 * 计算节点黑高
 * @param {*} x 
 * 带有叶子节点
 */
function blackHight(x){
  var h = x == T.nil ? 0 : 1;
  while(x.p !== T.nil){
      if(x.color === BLACK)  ++h;
      x = x.p;
  }
  return h;
}
/**
 * @param {*} x 
 */
function blackHight(x){
  var h = 1;
  while(x !== T.nil){
    if(x.color === BLACK)  ++h;
      x = x.left;

  }
  return h;
}

function deleteNodes(T){
  while(T.size){
    rb_delete(T, T.root);
    console.log('[T.size = %s] [%s]',T.size, T.root.key);
  }
}

// insertNodes(T);
// inorder(T.root, 0);
// traverse(T.root, 0,0);
// deleteNodes(T); 


