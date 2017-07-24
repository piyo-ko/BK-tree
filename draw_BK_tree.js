/* 
[Schematic example of a BK-tree]
(The leftmost node is the root, whose depth is 0.)
[BK 木の例のポンチ絵] (一番左のノードが根で、その深さは 0 である)

+------------------------> X
|     +-- O ----- O
|     |   
| O --+-- O
|     |
|     |       +-- O
|     |       |
|     +-- O --+-- O
|
Y

The specified BK-tree (BK_tree) will be visualized in a canvas element which 
will be added as a child of an existing element (e.g., div element) whose  
ID is parent_of_canvas.  The canvas element will be returned.

parent_of_canvas という ID の既存要素の子要素としてキャンバスを追加し、
そこに BK_tree を描画する。そのキャンバス要素を返す。

You can specify the color of nodes (node_color) and the color of edges 
(edge_color).  For example, colors like 'red', 'hsl(300, 100%, 50%)', etc. 
are acceptable. 
You can also specify the radius of nodes (node_radius) and the horizontal
interval between a node at depth i and a node at depth i+1 (depth_unit_length).

ノードの色、辺の色、ノードの半径、一つ深さをたどるごとのX方向の幅を
描画パラメタとして指定できる。
*/
function draw_BK_tree(BK_tree, node_color, edge_color, node_radius, depth_unit_length, parent_of_canvas) {

  // Calculate the diameter of nodes. (ノードの半径を求める)
  const node_diameter = Math.floor(node_radius/2);

  // Set the margin in X direction and that in Y direction.
  // Though it may be acceptable that they are equal to 
  // Math.ceil(node_radius/2), I prefer to provide more margins.
  // So they are set as below.
  // X 方向と Y 方向のマージン。両者とも、Math.ceil(node_radius/2) でも
  // よいかもしれないが、もう少し隙間が欲しいので、以下のようにしてある。
  const marginX = node_radius;
  const marginY = node_radius;

  // Set the minimum vertical interval between nodes which are next to 
  // each other in the vertical direction (i.e., in Y direction).
  // 隣のノードとの間の Y 方向での最小の隙間
  const Y_interval = node_radius * 2;

  // Initialize the maximum depth of this tree (BK_tree).  This value will be
  // needed to determine the width of the canvas.
  // この木全体で最大の深さ (canvasの幅を決めるのに必要) を初期化する。
  var deepest_depth = 0;

  // First, assign properties minX, minY, maxY, and posY to each node.
  // まず、各ノードに minX, minY, maxY, posY の属性を割り当ててゆく。
  
  // Property minX is the minimum X coordinate of the subtree whose root 
  // is the node concerned.  This is the X coordinate of the node itself
  // (more precisely, the X coordinate of the center of the circle that 
  // indicates this node) and is automatically determined by the depth
  // of this node.
  // minX は、そのノードを根とする部分木の最小 X 座標。つまり、そのノードの
  // 深さから自動的に決まる、そのノードの X 座標 (より正確には、ノードを表す
  // 円の中心の X座標)。
  
  // Properties minY and maxY indicate the vertical range occupied 
  // in Y direction by the subtree whose root is the node concerned
  // (more precisely, this range is calculated by taking into consideration 
  // the extent of the circles indicating nodes).
  // minY と maxY は、そのノードを根とする部分木が Y 方向において占める
  // 範囲を示す (ノードを表す円の大きさを考慮した範囲)。

  // Property posY is the Y coordinate of the center of the circle that 
  // indicates the node concerned.
  // posY は、そのノードを表す円の中心の Y 座標。
  
  // In order to calculate the values for these properties and assign 
  // those values to each node, let's define an internal function.
  // これらの値を計算して各ノードに割り当てる (記録する) ために、関数を定義
  // する。
  function assign_coordinates(T, depth, Y_offset) {
    T.minX = depth * depth_unit_length + marginX;
    T.minY = Y_offset;
    if (deepest_depth < depth) {
      deepest_depth = depth;
    }
    if (T.children.length==0) { // BK-tree T is a leaf (葉)
      T.posY = Y_offset + node_diameter;
      T.maxY = Y_offset + node_radius;
    } else { // BK-tree T has at least one child (子ノードあり)
      var minY_of_c_th_child = Y_offset; // intialized (初期化)
      var maxY_of_c_th_child;            // not initialized (初期値なし)
      for (var c = 0; c < T.children.length; c++) {
        maxY_of_c_th_child = assign_coordinates(T.children[c].subT, depth+1, minY_of_c_th_child);
        // Update minY_of_c_th_child for the next value of variable c.
        // 次の c に備えて minY_of_c_th_child を更新する。
        minY_of_c_th_child = maxY_of_c_th_child + Y_interval;
      }
      T.maxY = maxY_of_c_th_child;
      T.posY = Math.floor((T.children[0].subT.posY + 
                T.children[T.children.length - 1].subT.posY) / 2);
    }
    return T.maxY;
  }
  // Now we can call this internal function. (いま定義した関数を呼び出す)
  assign_coordinates(BK_tree, 0, marginY);

  // Now, the positions needed for visualization has been calculated.
  // Let's define a canvas element.
  // これで描画すべき位置が分かった。とりあえずキャンバスを定義する。
  var canv = document.createElement('canvas');
  canv.width = deepest_depth * depth_unit_length + marginX + node_radius * 2;
  canv.height = BK_tree.maxY + marginY * 2;

  // Define a context, too. (コンテキストを定義する)
  var ctx = canv.getContext('2d');
  
  // Next, let's define another internal function to draw a subtree.
  // 部分木を描画するための関数を定義する。
  function draw_subtree(T) {
    // A parent and its child are connected by a right-angled edge, not by a
    // diagonal edge, when children of the parent span a very wide extent 
    // in Y direction.  In such a case, if diagonal edges were used, they
    // might overlap with each other and thus we could not distinguish one
    // edge from another.
    // Y 方向においてあまりに広がりがある場合は、斜めの直線ではなく、鉤形に
    // 曲がる線で親と子を結ぶ。そうしないと、どの子への線だか不明になる
    // (線が重なるので、見てわからなくなる)。

    // Set the threshold for defining the above-mentioned 'very wide extent'.
    // 「あまりに広がりがあるかどうか」の閾値
    const maxY_for_diagonal = depth_unit_length * 6;

    var diagonal, midX, diffX;

    if (0 < T.children.length) { // not a leaf (葉ノードではない場合)
      // Calculate the extent in Y direction. (Y 方向における広がり)
      diffY = T.children[T.children.length - 1].subT.posY - 
              T.children[0].subT.posY;

      if (diffY <= maxY_for_diagonal) {
        // the case where diagonal edges are acceptable (斜線でも平気な場合)
        diagonal = true;
      } else {
        // the case where right-angled edges should be used
        // (鉤形の線にする場合)
        diagonal = false;
        midX = T.minX + Math.floor(depth_unit_length/2);
        // Draw the two lines which are independent of each individual child.
        // 個別の子ノードと関係なく先に描ける 2 本の線だけは描いてしまう。
        ctx.strokeStyle = edge_color;
        ctx.beginPath();
        ctx.moveTo(T.minX, T.posY);
        ctx.lineTo(midX, T.posY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(midX, T.children[0].subT.posY);
        ctx.lineTo(midX, T.children[T.children.length - 1].subT.posY);
        ctx.stroke();
      }
    }

    // Then, perform the following processing for each child.
    // Note that nothing will be done in this 'for statement' 
    // if tree T itself is a leaf.
    // 各子ノードについて処理。自分が葉の場合は、この for 文では何も起きない。
    for (var c = 0; c < T.children.length; c++) {
      // Draw the edge from the root of T to its c-th child.
      // 自分から、自分の c 番目の子ノードへの、辺を描画する。
      if (diagonal) { // Use a diagonal edge. (斜線を引く)
        ctx.strokeStyle = edge_color;
        ctx.beginPath();
        ctx.moveTo(T.minX, T.posY);
        ctx.lineTo(T.children[c].subT.minX, T.children[c].subT.posY);
        ctx.stroke();
      } else { 
        // From a point on the vertical line shared among the children 
        // to the c-th child, draw a horizontal line which is a part of 
        // a right-angled edge connecting the parent and the c-th child.
        // 子の間で共通の縦線から、この子のところまでだけ、横線を引く。
        ctx.strokeStyle = edge_color;
        ctx.beginPath();
        ctx.lineTo(midX, T.children[c].subT.posY);
        ctx.lineTo(T.children[c].subT.minX, T.children[c].subT.posY);
        ctx.stroke();
      }
      // Draw the c-th subtree. (c 番目の部分木を描画する)
      draw_subtree(T.children[c].subT);
    }

    // Finally, draw the parent node of these children (i.e., draw 
    // the root of T).
    // 最後に (これらの子の親たる) 自分を描画する。
    ctx.fillStyle = node_color;
    ctx.strokeStyle = node_color;
    ctx.beginPath();
    ctx.arc(T.minX, T.posY, node_radius, 0, Math.PI*2, true);  
    ctx.fill();
  }
  // Now we can call this internal function. (いま定義した関数を呼び出す)
  draw_subtree(BK_tree);

  // Add the canvas, where the tree has been drawn.
  // 描画したキャンバスを追加する。
  document.getElementById(parent_of_canvas).appendChild(canv);

  return canv;
}

/* 
This function adds a link to save, as a PNG image file, the content of 
the canvas element where the BK-tree has been drawn. 
* canv: the canvas element.
* filename_prefix: the prefix for the name of the image file to be downloaded 
* parent_of_a: the ID of the parent element of the 'a' element for the link
* a_text: the link text to be shown

BK 木が描画されたキャンバス要素の内容を PNG 画像として保存するためのリンクを
追加する。
* canv: キャンバス要素
* filename_prefix: ダウンロードされる画像ファイルの名前の接頭
* parent_of_a: リンク用の a 要素の親要素の ID
* a_text: 表示すべきリンクテキスト
*/
function download_image_of_canvas(canv, filename_prefix, parent_of_a, a_text) {
  var url, anchor;
  
  // Create a new 'a' element (新規 a 要素を作る)
  anchor = document.createElement("a");
  anchor.download = filename_prefix + get_timestamp_for_filename() + ".png";
  anchor.textContent = a_text;
  document.getElementById(parent_of_a).appendChild(anchor);

  // Check whether toBlob() method is supported or not.
  // toBlob() メソッドがサポートされているかどうかで場合分け。
  if (HTMLCanvasElement.prototype.toBlob) { // Firefox (as of 2017-07-23)
    canv.toBlob(function(blob) {
      url = URL.createObjectURL(blob);
      anchor.href = url;
    });
  } else { // Safari (as of 2017-07-23)
    url = canv.toDataURL();
    anchor.href = url;
  }
  return 0;
}

/* This function is similar to download_image_of_canvas() but different in that
this will cause a PNG file be automatically downloaded and in that the 'a'
is invisible.

download_image_of_canvas() に似ているが、PNG ファイルが自動的にダウンロード
される点と、a 要素が不可視である点において、異なる。
*/
function automatic_download(canv, filename_prefix) {
  var url, anchor;
  anchor = document.createElement("a");
  anchor.download = filename_prefix + get_timestamp_for_filename() + ".png";
  document.getElementsByTagName('body')[0].appendChild(anchor);
  
  if (HTMLCanvasElement.prototype.toBlob) { // Firefox (as of 2017-07-23)
    canv.toBlob(function(blob) {
      url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.click();
      URL.revokeObjectURL(url);
    });
  } else { // Safari (as of 2017-07-23)
    url = canv.toDataURL();
    anchor.href = url;
    anchor.click();
  }
  return 0;
}

