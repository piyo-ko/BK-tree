/* Create a new BK-tree from values (character strings) written in HTML 
element txt_src, which may be a textarea element.  The values should be written
in a way in which each one line includes one value.

txt_src は、1 行に 1 個ずつ値 (文字列) が書かれている (たとえば textarea 
などの) HTML 要素である。それらの値から、新たな BK 木を作る。
*/
function create_BK_tree(txt_src) {
  var BK;
  const vals = txt_src.value.split("\n");

  // Create a tree that includes only a single leaf, from the first value.
  // 最初の 1 個の値から、葉のみの木を作る。
  BK = {val: vals[0], children:[]};

  // For the remainder of the values, insert a node into the tree 
  // for each value.
  // 残りのそれぞれの値についてノードの挿入を行う。
  for (var i = 1; i < vals.length; i++) {
    insert_node(BK, vals[i]);
  }
  return BK;
}


/* Insert a node having value v, into BK-tree BK. 
Note that this functions uses distance() of dist.js.

値 v を有するノードを、BK 木に挿入する。
dist.js の distance() を利用しているので注意。
*/
function insert_node(BK, v) {
  // If v equals the value of the root of BK, it means that v has already been
  // registered in BK.  Thus, nothing should be done.
  // v が BK の根の値と等しければ、既に v は BK に登録済み。よって何もしない。
  if (v == BK.val) { return; }

  // Calculate the distance between the value of the root of BK and v.
  // BK の根の値と v との距離を計算する。
  const d = distance(BK.val, v);

  // Search for such a child of the root of BK that the distance from the root
  // equals d. (*)
  // BK の根の子ノードのうち、距離が d と等しいものを探す。 (*)
  for (var c = 0; c < BK.children.length; c++) {
    if (BK.children[c].dist == d) {
      // If such a child is found, insert a leaf having value v, into 
      // the subtree whose root is the found child.
      // もし見つかれば、その子ノードを根とする部分木の中に、
      // v を値とする葉を挿入する。
      insert_node(BK.children[c].subT, v);
      return;
    }
  }

  // The only case in which the code hereafter will be executed is the case
  // in which no child has been found in the above search (*).  In such a case,
  // insert a leaf whose value is v, as a new child of the root of BK.
  // ここにくるのは、(*) の探索で求める子ノードが見つからなかった場合のみ。
  // この場合、BK の根の新たな子ノードとして、v を値とする葉を挿入する。
  BK.children[c] = {dist: d, subT: {val: v, children: []}};
  return;
}

