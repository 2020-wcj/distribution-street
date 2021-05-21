var value = window.location.href.split('=')[1];
var data = JSON.parse(window.localStorage.data);


for (let i = 0; i < data.length; i ++) {
    if (data[i].cnumber == value) {
        render(data[i]);
        break;
    }
}


function render(data) {
    var html = `
                <table>
                    <tr>
                        <td class="column">商家:</td>
                        <td class="information">${data.sid}</td>
                    </tr>
                    <tr>
                        <td class="column">投诉单号:</td>
                        <td class="information">${data.cnumber}</td>
                    </tr>
                    <tr>
                        <td class="column">投诉原因:</td>
                        <td class="information">${data.ccon}</td>
                    </tr>
                    <tr>
                        <td class="represen">佐证材料:</td>
                        <td>
                        <img class="picture" src="${data.cpicture}"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="column">原处理结果:</td>
                        <td class="information">${data.result}</td>
                    </tr>
                    <tr>
                        <td class="column">申诉原因:</td>
                        <td class="information">${data.acontent}</td>
                    </tr>
                    <tr>
                        <td class="represen">申诉材料:</td>
                        <td>
                        <img class="picture" src="${data.apicture}"/>
                        </td>
                    </tr>
                </table>
                <form class="result" method="post" action="http://wzqalrd.nat.ipyingshe.com/verifyappeal" target="_blank">
                    <div class="column">处理结果:</div>
                    <select name="aresult" id="userSelect">
                        <option value="维持原处理结果">维持原处理结果</option>
                        <option value="撤销处罚">撤销处罚</option>
                    </select>
                    <input name="ccnumber" value="${data.cnumber}" type="input" style="display: none"></input>
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


const imgNodeList = document.getElementsByClassName("picture");
const body = document.getElementsByTagName("body")[0];
const returnBtn = document.getElementById("return");

// 返回上一页
returnBtn.onclick = function () {
    window.history.go(-1);
}


for(let i = 0; i < imgNodeList.length; i ++){
    imgNodeList[i].onclick = function () {
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
}
