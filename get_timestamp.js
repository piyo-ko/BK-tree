// yyyy-mm-dd_hhmmss
function get_timestamp_for_filename() {
  var d = new Date();
  var yyyy = d.getFullYear();
  var mm_month = d.getMonth() + 1;
  var dd = d.getDate();
  var hh = d.getHours();
  var mm_min = d.getMinutes();
  var ss = d.getSeconds();

  var s = yyyy + "-";
  s += ((mm_month < 10) ? "0" + mm_month : mm_month);
  s += ((dd < 10) ? "-0" + dd : "-" + dd);
  s += ((hh < 10) ? "_0" + hh : "_" + hh);
  s += ((mm_min < 10) ? "0" + mm_min : mm_min);
  s += ((ss < 10) ? "0" + ss : ss);
  return s;
}
