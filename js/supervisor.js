// 获取修改按钮
const addNode = document.getElementById("add");
const btnDeleteNode = document.getElementsByClassName("btnDelete");
const tianNode = document.getElementsByClassName("tianjia")[0];

console.log(btnDeleteNode);
addNode.onclick = function () {
    for (let i = 0; i < btnDeleteNode.length; i++) {
        // 删除
        btnDeleteNode[i].onclick = function (){
            this.parentNode.style.display = 'none'
            // $.ajax({
            //     type : "post",
            //     data : {
            //         name : 'delete',
            //         type : 'delete'
            //     },
            //     dataType : "json",
            //     url : "http://wzqalrd.nat.ipyingshe.com/delete",
                // success : function (){
                        
                // }
            // });
        }

        // 点击修改出现按钮
        let node = btnDeleteNode[i].style.display;
        console.log(node);
        if (node == "block") {
            btnDeleteNode[i].style.display = "none";
            tianNode.style.display = "none"
        } else {
            btnDeleteNode[i].style.display = "block";
            tianNode.style.display = "block"
        }
    }
    console.log(this.style);
    if(this.innerHTML != "修改完成"){
        this.innerHTML = "修改完成"
    }else {
        this.innerHTML = "修改"
    }

}
