/*
distance(a, b) calculates Levenshtein distance between strings a and b.
Note that this function may fail for strings including non-Basic-
Multilingual-Plane (non-BMP) characters since this function uses (and 
depends on) String.charAt() function.

レーベンシュタイン距離 (Levenshtein distance) を計算する。
注意: String.charAt() 関数を使っているので、非 Basic-Multilingual-Plane (BMP) 
文字には対応していないのだが、今のところ、その辺りの対応は考えていない。
*/

function distance(a, b) {
  // three trivial cases. 自明な場合が3通りある。
  if (a == b) {return 0;}
  if (a.length == 0) {return b.length;}
  if (b.length == 0) {return a.length;}

  // initialize a 2-dimensional array
  // 素朴に2次元配列を作って計算するので、まず初期化。
  const R=a.length;
  const C=b.length;
  var d = new Array(R+1);
  var r,c;
  for (r=0; r<=R; r++) {
    d[r] = new Array(C+1);
  }
  
/*
   | 0  1  2  ... C
---+-----------------
  0| 0  1  2  ... C
  1| 1
  2| 2
  :| :
  R| R
*/
  for (c=0; c<=C; c++) {
    d[0][c]=c;
  }
  for (r=1; r<=R; r++) {
    d[r][0]=r;
  }
  for (r=1; r<=R; r++) {
    for (c=1; c<=C; c++) {
      d[r][c]=0;
    }
  } // end of the initialization (初期化終了)

  // start the calculation of the distance (いざ計算開始)
  var s; // for substitution (文字の入れ替え)
  for (r=1; r<=R; r++) {
    for (c=1; c<=C; c++) {
      s = ((a.charAt(r-1) == b.charAt(c-1)) ? 0 : 1);
      d[r][c] = Math.min(d[r-1][c]+1, d[r][c-1]+1, d[r-1][c-1]+s);
    }
  }
  return d[R][C];
}


