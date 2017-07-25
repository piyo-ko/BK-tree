# BK 木を使った曖昧検索 / Fuzzy search with a BK-tree

「[興味深いデータ構造：BK木](http://postd.cc/bk-tree/)」という記事が興味深かったので、BK 木を使った曖昧検索を JavaScript で実装してみました。

A simple JavaScript implimentation for fuzzy search with a BK-tree is provided here. This is motivated by a very interesting article titled "[Interesting data structures: the BK-tree](http://signal-to-noise.xyz/post/bk-tree/)".

## 最低限必要なもの / Files required in the minimum configuration
探索対象の BK 木 (の JavaScript オブジェクト) を用意したうえで、以下の二つのファイルを読み込んで、探索用関数を呼び出すための追加のスクリプトをちょっと書くだけで、用途に応じた曖昧検索ページを作れます。

* `search_BK_tree.js`: 曖昧検索のための関数を定義
* `dist.js`: 距離関数を定義

You can easily create a page for fuzzy search tailored for your purpose, only by preparing a BK-tree (in the form of a JavaScript object) to be searched, importing the two files indicated below, and writing a small piece of additional script code to call the search function.

* `search_BK_tree.js`: a function for fuzzy search is defined.
* `dist.js`: a distance function is defined.

## おまけ / Supplementary materials and tools

file | 説明 | description
-----|------|-------------
`sample_BK_tree.js` | 簡単な BK 木を JavaScript オブジェクトとして定義したもの | a definition of a simple BK-tree as an JavaScript object
`docs/test_with_sample.html` | 簡単なテスト例 (実際の利用例へのリンクあり) | illustrative simple tests (incl. a link to an actual example)
`print_BK_tree.js` | デバッグ用の印字関数 | a function to print a BK-tree for debugging
`draw_BK_tree.js` | BK 木を描画する関数と、それを画像ファイルとしてダウンロードできるようにする関数 | a function to draw a BK-tree and functions to make the image file of it downloadable
`get_timestamp.js` | yyyy-mm-dd_hhmmss 形式のタイムスタンプ (ファイル名の一部にする) を返す関数 | a function to return a timestamp (to be used as a part of a file name) in yyyy-mm-dd_hhmmss format
`docs/draw_BK_tree.html` | サンプルの BK 木を描画して画像ファイルとしてダウンロードするページの例 | an illustrative page for drawing a sample BK-tree and for downloading the image file of it
`create_BK_tree.js` | BK 木を作成する関数 | functions to create a new BK-tree
`docs/create_BK_tree.html` | 入力された文字列からBK 木を作成し、JSON 形式と画像で表示するページ | a page for creating a BK-tree from input strings and displaying the tree in JSON format and as an image

たとえば以下のようにして Imagemagick の `convert` コマンドを使うと、ダウンロード済み画像を回転できます。

Using `convert` command of Imagemagick, you can rotate the downloaded image file.  One example of such rotation is indicated below.

````
$ convert -rotate 90 tree_2017-07-31_123456.png rotated_tree.png
````
