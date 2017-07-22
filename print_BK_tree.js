/*
print_BK_tree(BK, depth) is provided for debugging.
This will print BK-tree BK in the browser's console in a simple format.
Note that this function is recursively defined, and needs to be called 
from somewhere else with argument depth being 0.

BK 木を console に印字する。デバッグ用。
再帰的定義なので、最初の呼び出しでは depth を 0 とすること。
*/
function print_BK_tree(BK, depth) {
  var indent="";
  for (var i = 0; i < depth; i++) { 
    indent += "   "; 
  }
  var val_str = indent + "[[ " + BK.val + " ]]";
  if (BK.children.length==0) {
    console.log(val_str + " (this node is a leaf)");
  } else {
    console.log(val_str);
    for (var c = 0; c < BK.children.length; c++) {
      console.log(indent + "|__(" + BK.children[c].dist + ")__");
      print_BK_tree(BK.children[c].subT, depth+1);
    }
  }
}
