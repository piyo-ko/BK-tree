# BK 木を使った曖昧検索 / Fuzzy search with a BK-tree

「[興味深いデータ構造：BK木](http://postd.cc/bk-tree/)」という記事が興味深かったので、BK 木を使った曖昧検索を JavaScript で実装してみました。

A simple JavaScript implimentation for fuzzy search with a BK-tree is provided here. This is motivated by a very interesting article titled "[Interesting data structures: the BK-tree](http://signal-to-noise.xyz/post/bk-tree/)".

## 最低限必要なもの / Files required in the minimum configuration
以下の二つのファイルを読み込んで、探索用関数を呼び出すための追加のスクリプトをちょっと書くだけで、用途に応じた曖昧検索ページを作れます。

* `search_BK_tree.js`: 曖昧検索のための関数を定義
* `dist.js`: 距離関数を定義

You can easily create a page for fuzzy search tailored for your purpose, only by importing the two files indicated below and writing a small piece of additional script code to call the search function.

* `search_BK_tree.js`: a function for fuzzy search is defined.
* `dist.js`: a distance function is defined.

## おまけ / Supplementary materials and tools

file | 説明 | description
-----|------|-------------
`sample_BK_tree.js` | 簡単な BK 木を JavaScript オブジェクトとして定義したもの | a definition of a simple BK-tree as an JavaScript object
`docs/test_with_sample.html` | 簡単なテスト例 (実際の利用例へのリンクあり) | illustrative simple tests (incl. a link to an actual example)
`print_BK_tree.js` | デバッグ用の印字関数 | a function to print a BK-tree for debugging