// const inputNodeList = document.getElementsByTagName("input");
const upLoad = document.getElementsByClassName('upload')[0];
const headerP = document.getElementsByClassName("headerP")[0];
const result = document.getElementsByClassName("result")[0];
const submit = document.getElementsByClassName("submit")[0];
const inputList = document.getElementsByTagName("input");
const textA = document.getElementsByClassName("content")[0];

// console.log(inputNodeList);

// if(!isIntact (inputNodeList)){
//     alert("请把信息填写完成");
// }

result.onclick = function () {
    window.history.go(-1);
}


let pictureUrl = "";
let isUp = false;

upLoad.onchange = function () {
    console.log(this.files[0]);
    const changeFile = this.files[0];
    const ftype = changeFile.name.substring(changeFile.name.lastIndexOf(".") + 1);
    //校验格式是否是图片类型
    if (ftype == "jpg" || ftype == "png" || ftype == "jpeg" || ftype == "JPG") {
        //限制大小，照片大小不能超过1M
        const size = changeFile.size / 1024 / 1024;
        if (size > 1) {
            alert("头像不能大于1M");
            return false;
        }
        // 实例化一个阅读器对象
        const reader = new FileReader();
        // 读取文件的路径，没有返回值,结果在reader.result里
        reader.readAsDataURL(changeFile);
        // 读取需要时间，读完后再修改图片路径
        reader.onload = function () {
            //回显给上方图片中
            const imgNode = document.createElement("img");
            pictureUrl = this.result;
            imgNode.src = this.result;
            imgNode.className = "headerPicture";
            headerP.innerHTML = "";
            headerP.appendChild(imgNode);
            isUp = true;
        }
    } else {
        alert("头像格式不对，请重新选择！");
        return false;
    }
}


submit.onclick = function () {
    let data = {};
    for (let i = 0; i < inputList.length; i++) {
        data[inputList[i].name] = inputList[i].value;
    }
    // 图片地址与多行文本内容
    data["picture"] = pictureUrl;
    data["textA"] = textA.value;

    if (!isIntact(inputList)) {
        alert("未填写完成");
    } else {
        myajax(data);
        alert("提交并填写完成");
    }
}

// 判断是否填写完整
function isIntact(inputList) {
    // 是否传头像
    if (!isUp) {
        return false;
    }
    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].value == "") {
            return false;
        }
    }
    return true;
}


function myajax(myData) {
    console.log(myData);
    $.ajax({
        type: 'post',
        data: myData,
        dataType: 'json',
        url: 'http://wzqalrd.nat.ipyingshe.com/admin/add',
        success: function (res) { // 返回成功
            if (res.code === 200) {
                console.log("发送数据成功");
                // alert(msg) // 上传成功
            } else {
                // alert(msg) // 上传失败
            }
        },
        error: function () {
            alert("接口错误"); // 返回失败
        }
    })
}