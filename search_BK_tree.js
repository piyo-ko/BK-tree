/* 
search_BK_tree(q, N, BK) searches BK-tree BK for strings whose distance 
from query string q is N or less.  
This function returns an array whose i-th element is an array of strings 
whose distance from q is i.

q はクエリ文字列。
N は許容できるレーベンシュタイン距離の範囲 (0以上の整数)。
BK は探索対象の BK木。
返される探索結果は配列である。その i 番目の要素は、q からの距離が i の
文字列の配列である。
*/
function search_BK_tree(q, N, BK) {
  // each candidates[i] is a BK-tree whose root's value (indicated by 
  // a string) is a candidate for the answer.
  // 各 candidates[i] は BK 木であり、その木の根の値 (文字列) が
  // 「答え」の候補であるようなもの。
  var candidates = [BK];
  
  // results[i] is an array that indicates the set of strings whose distance
  // from q is i.
  // results[i] は q から距離 i の文字列の集合 (を配列で表したもの)。
  var results = new Array(N+1);
  for (var j=0; j <= N; j++) {
    results[j] = new Array();
  }

  // while an untested candidate remains, test it and 
  // add new candidates if any.
  // まだ調べていない候補が残っている限り、それを調べ、もしあれば新たな候補を
  // 追加する。
  while (candidates.length > 0) {
    // pick up the current candidate to be tested (調べるべき「今の候補」)
    var cur_candidate = candidates.pop();

    // check whether the current candidate is acceptable or not, and 
    // if acceptable, record it.
    // まず「今の候補」が答えになるかを調べ、なるなら記録する。
    var D = distance(q, cur_candidate.val);
    if (D <= N) {
      results[D].push(cur_candidate.val);
    }

    // as new candidates, add children of the current candidate 
    // whose distance (dist) from the current candidate is 
    // no less than D-N and no more than D+N.
    // 次に、「今の候補」から D-N 以上 D+N 以下の距離にあるような、
    // 「今の候補」の子ノードを候補として追加する。
    for (var c = 0; c < cur_candidate.children.length; c++) {
      var dist = cur_candidate.children[c].dist;
      if (D-N <= dist && dist <= D+N) {
        candidates.push(cur_candidate.children[c].subT);
      }
    }
  }

  return(results);
}
