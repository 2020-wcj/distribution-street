const btnSearch = document.getElementsByClassName("btnSearch")[0];
// 订单号
// const transactionNum = document.getElementsByClassName("transactionNum")[0];
// 投诉单号
const complaNum = document.getElementsByClassName("complaNum")[0];
// select选择框
const selectNode = document.getElementById("page");

// left按钮
const leftNode = document.getElementsByClassName("left")[0];
// right按钮
const rightNode = document.getElementsByClassName("right")[0];
// go按钮
const goNode = document.getElementsByClassName("go")[0];
// goPage
const goPage = document.getElementsByClassName("goPage")[0];

const showDow = document.getElementsByClassName("show")[0];
const hiddenDow = document.getElementsByClassName("hidden")[0];


// var showResult = post();
// 下面这个变量，和for要注销，上面那个要解开注销
var showResult = [];
for (let i = 0; i < 35; i++) {
    showResult.push({
        sid: i + 1,
        cnumber: 1234771234123,
        ccon: "投诉原因",
        apicture: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg",
        cid: "客户id",
        state: false
    });
}

console.log(showResult);


var d = JSON.stringify(showResult);
window.localStorage.setItem("data", d);

let indexPage = 1;

render(showResult);
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


// 数据请求
function post() {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr.open("post", "http://wzqalrd.nat.ipyingshe.com/admin/complain1", false);
    // console.log(xhr.readyState);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // document.getElementById("test").innerText = xhr.responseText;
            var data = JSON.parse(xhr.responseText); //  变成JSON对象
            // console.log(data);
            result = data;
        }

    }
    xhr.send();
    return result;
}



// 给搜索绑定事件
btnSearch.onclick = function () {
    const complaNumVal = complaNum.value;
    // const transactionNumVal = transactionNum.value;
    // console.log(complaNumVal);
    // 两个都没有输入的话就直接返回
    // if (!complaNumVal && !transactionNumVal) {
    //     return;
    // }
    let result = false;
    for (let i = 0; i < showResult.length; i ++) {
        if (showResult[i].cnumber == complaNumVal) {
            result = true;
            render([showResult[i]]);
            // console.log(showResult[i]);
        }
    }
    if (!result) {
        render(showResult);
    }
}


function render(showResult, indexPage) {
    var html = ``;
    // 投诉处理数量
    for (var i = 0; i < showResult.length; i ++) {
        // ${}   里面写的是变量，但是这个只能写在 `` 里面。
        // ` `   里面写字符串和数据，写数据要加 ${}，
        html += `<li>
                    <a href="./complaintMes.html?value=${showResult[i].cnumber}">
                        <span class="order">${+indexPage && +indexPage != 1 ? (+indexPage - 1) * 10 + 1 +i: +i + 1}</span>
                        <span class="cnumber">${showResult[i].cnumber}</span>
                        <span class="sid">${showResult[i].sid}</span>
                        <span class="cid">${showResult[i].cid}</span>
                        <span class="dates">${showResult[i].dates}</span>
                        <span class="state">${showResult[i].state ? "已处理" : "未处理"}</span>
                    </a>
                </li>
        `;
        if (+i >= 9) {
            break;
        }

    }
    document.getElementsByClassName("list")[0].innerHTML = html;
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



showDow.onclick = function (){
    let showList = [];
    showList = showResult.filter(item => {
        return item.state == true;
    });
    render(showList);
}

hiddenDow.onclick = function (){
    let hiddenList = [];
    hiddenList = showResult.filter(item => {
        return item.state == false;
    });
    render(hiddenList);
}

