// select选择框
const selectNode = document.getElementById("page");

// left按钮
const leftNode = document.getElementsByClassName("left")[0];
// right按钮
const rightNode = document.getElementsByClassName("right")[0];
// go按钮
const goNode = document.getElementsByClassName("go")[0];
// goPage
const goPage = document.getElementsByClassName("go")[0];


const btnSearch = document.getElementsByClassName("btnSearch")[0];
// 商家
const sid = document.getElementsByClassName("sid")[0];
// 投诉单号
const complaNum = document.getElementsByClassName("complaNum")[0];



// var showResult = post();
// console.log(showResult);
// 下面这个变量要注销，上面那个要解开注销
var showResult = {
    1: {
        sid : "1",
        cnumber : 1234771234123,
        ccon : "123",
        apicture: "abc",
        cpicture: "123",
        acontent: "123",
        result: "2",
    },
    2 :{
        sid : "2",
        cnumber : 1234771234123,
        ccon : "32",
        apicture: "abc",
        cpicture: "4",
        acontent: "6",
        result: "7",
    }
};


let arr = [];
let indexPage = 1;
for(let i in showResult){
    arr.push(showResult[i]);
}

showResult = arr;

var d = JSON.stringify(showResult);
window.localStorage.setItem("data", d);
render (showResult);
pageRender(showResult);



goNode.onclick = function (){
    let goPageVal = goPage.value;
    goPageVal = +goPageVal;
    
    console.log(showResult.length / 10 + 1);
    if(!goPageVal){
        return;
    }else if(goPageVal >= parseInt(showResult.length / 10) + 1){
        // 输入的页面数字大于他的页数
        selectNode.options[parseInt(showResult.length / 10)].selected = true;
        render(showResult.slice((parseInt(showResult.length / 10)) * 10 ,showResult.length), parseInt(showResult.length / 10) + 1);
    }else if(goPageVal <= 1){
        selectNode.options[0].selected = true;
        render(showResult.slice(0 , 10), 1);
    }else {
        selectNode.options[goPageVal - 1].selected = true;
        render(showResult.slice((goPageVal - 1) * 10 ,goPageVal * 10), goPageVal);
    }
    
}


leftNode.onclick = function (){
    if(indexPage == 1){
        alert('已经是第一页了');
        return ;
    }else {
        indexPage --;
        selectNode.options[indexPage - 1].selected = true;
        render(showResult.slice((indexPage - 1) * 10 ,indexPage * 10), indexPage);
    }

}

rightNode.onclick = function (){
    if(indexPage * 10 >= showResult.length){
        alert('已经是最后一页了');
        return ;
    }else {
        indexPage ++;
        selectNode.options[indexPage - 1].selected = true;
        render(showResult.slice((indexPage - 1) * 10 ,indexPage * 10), indexPage);
    }

}





function render (showResult){
    var html = ``;
    let j = 0;
    for (let i = 0; i < showResult.length; i ++) {
        // ${}   里面写的是变量，但是这个只能写在 `` 里面。
        // ` `   里面写字符串和数据，写数据要加 ${}，
        j ++;
        html += `<li>
                    <a href="./representationsMes.html?value=${showResult[i].cnumber}">
                        <span class="orderChild">${j}</span>
                        <span>${showResult[i].sid}</span>
                        <span class="transactionChi">${showResult[i].cnumber}</span>
                    </a>
                </li>
        `;
        if(i >= 9){
            break;
        }
    
    }
    document.getElementsByClassName("list")[0].innerHTML = html;
}



// getElementById 这是获取id为big的div，然后把html这个变量加进入

// 给搜索绑定事件
btnSearch.onclick = function (){
    const complaNumVal = complaNum.value;
    const sidVal = sid.value;
    let result = false;
    for(let i = 0; i < showResult.length; i ++){
        if(showResult[i].cnumber == complaNumVal || showResult[i].sid == sidVal){
            result = true;
            render([showResult[i]]);
        }
    }
    if(!result){
        render (showResult);
    }
     
}



function post() {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr.open("post", "http://wzqalrd.nat.ipyingshe.com/admin/bappeal1", false);
    // console.log(xhr.readyState);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // document.getElementById("test").innerText = xhr.responseText;
            var data = JSON.parse(xhr.responseText); //  变成JSON对象
            console.log(data);
            result = data;
        }

    }
    xhr.send();
    return result;
}

// 渲染页面
function pageRender() {
    var page = 0;
    // 页面数量,获取对象属性个数
    page = showResult.length / 10;
    for (let j = 1; j < page + 1; j++) {
        const option = document.createElement("option");
        option.value = j;
        option.textContent = j;
        // 点击跳转下一页
        
        selectNode.onchange = function () {
            // console.log(this.selectedIndex);
            indexPage = this.options[this.selectedIndex].value;
            console.log(indexPage);
            render(showResult.slice((indexPage - 1) * 10 ,indexPage * 10), indexPage);
        }
        selectNode.appendChild(option);
        // console.log(option.onclick);
    }
}
