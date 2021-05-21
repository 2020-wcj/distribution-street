const ulNode = document.getElementById("select");

// 先让当前标签为首页
let pre = ulNode.childNodes[3];

ulNode.onclick = function (e){
    if(pre){
        pre.classList.remove("active");
    }
    pre = e.path[1];
    pre.classList.add("active");
}