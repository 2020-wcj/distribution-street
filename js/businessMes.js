var value = window.location.href.split('=')[1];
var data = JSON.parse(window.localStorage.data);


console.log(value, data);
for (var i = 0; i < data.length; i ++) {
    if (data[i].snid == value) {
        render(data[i]);
        break;
    }
}

function render(data) {
    var html = `
                <table>
                    <tr>
                        <td class="column">摊位头像:</td>
                        <td class="header-picture">
                            <img src="${data.hportrait}"></img>
                        </td>
                    </tr>
                    <tr>
                        <td class="column">摊贩个人头像:</td>
                        <td class="header-picture">
                            <img src="${data.photo}"></img>
                        </td>
                    </tr>
                    <tr>
                        <td class="column">摊位号:</td>
                        <td class="information">${data.sid}</td>
                    </tr>
                    <tr>
                        <td class="column">摊位名:</td>
                        <td class="information">${data.sname}</td>
                    </tr>
                    <tr>
                        <td class="column">摊位类型:</td>
                        <td class="information">${data.stype}</td>
                    </tr>
                    <tr>
                        <td class="column">摊贩姓名:</td>
                        <td class="information">${data.sowner}</td>
                    </tr>
                    <tr>
                        <td class="column">摊贩身份证号码:</td>
                        <td class="information">${data.snid}</td>
                    </tr>
                    <tr>
                        <td class="column">是否通过审核:</td>
                        <td class="information">${data.porn}</td>
                    </tr>
                    <tr>
                        <td class="column">摊位信誉分:</td>
                        <td class="information">${data.prestige}</td>
                    </tr>
                    <tr>
                        <td class="column">摆摊工具:</td>
                        <td class="information">${data.tools}</td>
                    </tr> 
                    <tr class="${data.porn ? "hidden": ""}">
                        <td class="column">审核结果:</td>
                        <td class="information">${data.bresult}</td>
                    </tr> 
                    <tr class="image">
                        <td class="column">身份证图片:</td>
                        <img src="${data.certificates}" class="picture ${data.porn ? "remove-pic" : "" }"></img>
                    </tr>
                </table>
                <form class="result" method="post" action="http://wzqalrd.nat.ipyingshe.com/admin/bresult">
                    <input name="sid" value="${data.sid}" type="input" style="display: none"></input>
                    <input name="bresult" value="${data.bresult}" type="input" style="display: none"></input>
                    <input id="up" type="submit" class="submit ${data.porn ? "hidden" : ""}" value="提交"/>
                </form>
                
            `;
    document.getElementById("whole").innerHTML = html;
}



const imgNode = document.getElementsByClassName("picture")[0];
const body = document.getElementsByTagName("body")[0];

imgNode.onclick = function () {
    var newDiv = document.createElement('div');
    newDiv.className = 'mark';
    body.appendChild(newDiv);
    var newImg = document.createElement('img');
    newImg.className = 'pic';
    newImg.src = this.src;
    // newImg.src=this.childNodes[0].src;
    body.appendChild(newImg);

    newDiv.onclick = function () {
        body.removeChild(newDiv);
        body.removeChild(newImg);
    }
}

const returnBtn = document.getElementById("return");

// 返回上一页
returnBtn.onclick = function () {
    window.history.go(-1);
}


// const submitDom = document.getElementsByClassName("submit")[0];


// submitDom.onclick = function (){
//     // window.history.go(-1);
//     // data[0].porn = true;
//     // render(data[0]);
//     window.history.go(-1);
//     location.reload(); 
//     alert("已成功提交");
// }