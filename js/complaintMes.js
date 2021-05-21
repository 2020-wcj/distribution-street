var value = window.location.href.split('=')[1];
var data = JSON.parse(window.localStorage.data);


for (var i = 0; i < data.length; i++) {
    if (data[i].cnumber == value) {
        render(data[0]);
        break;
    }
}


function render(data) {
    var html = `
                <table>
                    <tr>
                        <td class="column">商家:</td>
                        <td class="information">${data.cid}</td>
                    </tr>
                    <tr>
                        <td class="column">订单号:</td>
                        <td class="information">${data.cnumber}</td>
                    </tr>
                    <tr>
                        <td class="column">投诉原因:</td>
                        <td class="information">${data.ccon}</td>
                    </tr>
                    <tr class="image">
                        <td class="column">佐证材料:</td>
                        <img src="${data.cpicture}" class="picture"></img>
                    </tr>
                </table>
                <form class="result" method="post" action="http://wzqalrd.nat.ipyingshe.com/admin/result" target="you0">
                    <div class="column">处理结果:</div>
                    <select name="result" id="userSelect">
                        <option value="警告商家">警告商家</option>
                        <option value="处理商家">处理商家</option>
                        <option value="列出重点监管对象">列出重点监管对象</option>
                        <option value="打回投诉">打回投诉</option>
                    </select>
                    <input name="cnumber" value="${data.cnumber}" type="input" style="display: none"></input>
                    <input class="submit" type="submit" value="提交" /> 
                </form>
            `;
    document.getElementById("whole").innerHTML = html;
}

// const selectNode = document.getElementById("userSelect");
// const priceNode = document.getElementsByClassName("price")[0];

// selectNode.onclick = function (){
//     // console.log("click");
//     const optionIndex = this.selectedIndex;
//     const optionText = this.options[optionIndex];
//     if (optionText.value == "处理商家") {
//         priceNode.style.display = "block"
//         // console.log("chuli");
//     }else {
//         priceNode.style.display = "none"
//     }
// }


const imgNode = document.getElementsByClassName("picture")[0];
const body = document.getElementsByTagName("body")[0];
const returnBtn = document.getElementById("return");

// 返回上一页
returnBtn.onclick = function () {
    window.history.go(-1);
}


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