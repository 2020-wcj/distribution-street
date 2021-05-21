
const btnSearch = document.getElementsByClassName("btnSearch")[0];
// 身份证
const transactionNum = document.getElementsByClassName("complaNum")[0];
// 姓名
// const complaNum = document.getElementsByClassName("sid")[0];
// select选择框
const selectNode = document.getElementById("page");

const showDom = document.getElementsByClassName("show")[0];

const hiddenDom = document.getElementsByClassName("hidden")[0];

// left按钮
const leftNode = document.getElementsByClassName("left")[0];
// right按钮
const rightNode = document.getElementsByClassName("right")[0];
// go按钮
const goNode = document.getElementsByClassName("go")[0];
// goPage
const goPage = document.getElementsByClassName("go")[0];


// var showResult = post();
// console.log(showResult);
// 下面这个变量要注销，上面那个要解开注销
var showResult = {
    0: {
        sid: '1',
        sowner: '商家名字',
        snid: '12345614511234123',
        sname: '摊位名',
        stype: "摊位类型",
        hportrait : "#",
        prestige : "5分",
        tools : "车",
        photo: "#",
        certificates: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg",
        porn : false,
    },
    1: {
        sid: '2',
        sowner: '商家名字',
        snid: '12345614511',
        sname: '摊位名',
        stype: "摊位类型",
        hportrait : "#",
        prestige : "5分",
        tools : "车",
        photo: "#",
        certificates: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg",
        porn : false,
    },
    2: {
        sid: '12',
        sowner: '商家名字',
        snid: '1234511234123',
        sname: '摊位名',
        stype: "摊位类型",
        hportrait : "#",
        prestige : "5分",
        tools : "车",
        photo: "#",
        certificates: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg",
        porn : true,
    },

}



// 变成数组
let arr = [];
let indexPage = 1;
for(let i in showResult){
    arr.push(showResult[i]);
}

showResult = arr;

var d = JSON.stringify(showResult);
window.localStorage.setItem("data", d);


render(showResult);
pageRender(showResult);



// 给搜索绑定事件
btnSearch.onclick = function () {
    // const complaNumVal = complaNum.value;
    const transactionNumVal = transactionNum.value;
    // console.log(transactionNumVal);
    // 两个都没有输入的话就直接返回
    if (!transactionNumVal) {
        return;
    }
    
    let result = false;
    for (let i = 0; i< showResult.length; i ++) {
        if (showResult[i].sid == transactionNumVal) {
            result = true;
            console.log(showResult[i]);
            render([showResult[i]]);
        }
    }
    if (!result) {
        render(showResult);
    }

}



function render(showResult, indexPage) {
    var html = ``;
    // 投诉处理数量
    for (let i = 0; i < showResult.length ; i ++) {
        // ${}   里面写的是变量，但是这个只能写在 `` 里面。
        // ` `   里面写字符串和数据，写数据要加 ${}，
        // 序号 <span>${+indexPage && +indexPage != 1 ? +indexPage + 9 + +i: +i + 1}</span>
        html += `<li class="list-mes">
                    <a href="./businessMes.html?value=${showResult[i].snid}">
                        <span class="sid">${showResult[i].sid}</span>
                        <span class="sname">${showResult[i].sname}</span>
                        <span class="stype">${showResult[i].stype}</span>
                        <span class="sowner">${showResult[i].sowner}</span>
                        <span class="porn">${showResult[i].porn ? "是": "否"}</span>
                    </ul> 
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
function pageRender(showResult) {
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
            var indexPage = this.options[this.selectedIndex].value;
            console.log(indexPage);
            render(showResult.slice((indexPage - 1) * 10 ,indexPage * 10), indexPage);
        }
        selectNode.appendChild(option);
        // console.log(option.onclick);
    }
}





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

// 显示已审核
showDom.onclick = function (){
    let showList;
    showList = showResult.filter(item => {
        return item.porn == true;
    })
    render(showList);
}


// 显示未审核

hiddenDom.onclick = function (){
    let showList;
    showList = showResult.filter(item => {
        return item.porn == false;
    })
    render(showList);
}



function post() {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr.open("get", "http://wzqalrd.nat.ipyingshe.com/admin/buslist1", false);
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