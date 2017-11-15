/**
 * 功能：将函数绑定到onload事件上。
 * @param func
 */
function addLoadEvent(func){
    var oldonload= window.onload;//获取已经绑定到加载事件上的函数
    if(typeof window.onload!='function'){//如果当前没有函数，
        window.onload = func;//则将新的函数绑定上
    }else {
        window.onload = function(){
            oldonload();//先执行旧，在执行新函数
            func();
        }

    }
}
/**
 * 功能：在目标元素之后添加新元素
 * @param 新元素
 * @param 目标元素
 */
function insertAfter(newElement,targetElement){
    var parentN = targetElement.parentNode;
    if(!parentN) return false;
    if(parentN.lastChild == targetElement){
        parentN.appendChild(newElement);
    }
    else {
        parentN.insertBefore(newElement,targetElement.nextSibling);
    }
}
/**
 * 功能：给元素添加样式
 * @param element
 * @param value
 */
function addClass(element,value){
    if(!element.className){  //先判断元素是否有样式名，如果没有
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName+="";
        newClassName+=value; //在原有的基础上，增加新样式
        element.className = newClassName;
    }
}

/**
 * 功能： 当前页面，对应链接高亮显示
 * @returns {boolean}
 */
function highLightPage(){
    if(!document.getElementsByTagName) return false;
    //获取链接
    var headers = document.body.getElementsByTagName("header");
    if(headers.length == 0) return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var aArr = navs[0].getElementsByTagName("a");
    var url = window.location.href;
    for(var i=0;i<aArr.length;i++){
        if(url.indexOf(aArr[i].getAttribute("href"))!=-1){
            aArr[i].className="here";
            var linkText = aArr[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linkText);
        }
    }
}
addLoadEvent(highLightPage);


/**
 * 功能：幻灯片动效
 * @param ElementID
 * @param final_x
 * @param final_y
 * @param interval
 * @returns {boolean}
 */
function moveElement(ElementID,final_x,final_y,interval){
    if(!document.getElementById) return false; //判断该方法是否存在
    var ele = document.getElementById(ElementID);
    if(ele.movement){
        clearTimeout(ele.movement); //如果当前存在定时器，消除定时器
    }
    if(!ele.style.left){
        ele.style.left = 0;
    }
    if(!ele.style.top){
        ele.style.top = 0; //如果元素没有定位值，则初始化为0
    }
    var x = parseInt(ele.style.left);
    var y = parseInt(ele.style.top); //定位值取出，将单位去除
    if(x==final_x&&y==final_y){
        return true;  //如果当前已经在目标位置，则退出
    }
    if(x<final_x){
        var dist = Math.ceil((final_x-x)/10);
        x= x+dist;
    }
    if(x>final_x){
        var dist= Math.ceil((x-final_x)/10);
        x= x- dist;
    }
    if(y<final_y){
        var dist = Math.ceil((final_y-y)/10);
        y=y+dist;
    }
    if(y>final_y){
        var dist = Math.ceil((y-final_y)/10);
        y=y-dist;
    }
    ele.style.left = x + "px";
    ele.style.top = y + "px";
    var repeat = "moveElement('"+ElementID+"',"+final_x+","+final_y+","+interval+")";
    ele.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
    //在body之后插入一个div,其包含幻灯片
    //获取body
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    //创建一个div
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    //创建一个图片元素
    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    var des;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover = function(){
            des = this.getAttribute("href");
            if(des.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(des.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(des.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(des.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(des.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);

/**
 * 功能： 将传递的sectionId显示出来
 * @param id
 * @returns {boolean}
 */
function showSection(id){
    var sections = document.getElementsByTagName("section");
    if(sections.length==0) return false;
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")==id){
            sections[i].style.display="block";
        }
        else
            sections[i].style.display="none";
    }
}

function prepareIntervalnav(){
    if(!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var aArr = navs[0].getElementsByTagName("a");
    if(aArr.length==0) return false;
    for(var i=0;i<aArr.length;i++){
        var href = aArr[i].getAttribute("href");
        aArr[i].sectionId = href.split("#")[1];
        if(!document.getElementById(aArr[i].sectionId)) continue;
        document.getElementById(aArr[i].sectionId).style.display= "none";
        aArr[i].onclick = function(){
            showSection(this.sectionId);
            return false;
        }
    }
}
addLoadEvent(prepareIntervalnav);


/**
 * 功能：通过占位符显示图片
 * @param whichPic
 * @returns {boolean}
 */
function showPic(whichPic){
    //如果没有占位符直接跳转到图片链接
    if(!document.getElementById("placeholder")) return true;
    //首先获取图片的src属性将其赋值给占位符
    var hre = whichPic.getAttribute("href");
    var place = document.getElementById("placeholder");
    place.setAttribute("src",hre);
    //判断描述文本元素是否存在
    if(!document.getElementById("description")) return false;
    var des = document.getElementById("description");
    //判断图片的title属性是否有值，有值则赋值给描述文本否则空字符串
    if(whichPic.getAttribute("title")){
        if(des.firstChild.nodeType==3){
            des.firstChild.nodeValue = whichPic.getAttribute("title");
        }
    }else {
        des.firstChild.nodeValue ="";
    }
    return false;
}

/**
 * 功能： 动态创建描述文本和占位符元素
 * @returns {boolean}
 */
function preparePlaceHolder(){
    if(!document.getElementById) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    //判断是否存在图片集
    if(!document.getElementById("imagegallery")) return false;
    //创建占位符并设置属性
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    //创建描述文本并将其附加到占位符之前
    var des = document.createElement("p");
    des.setAttribute("id","des");
    //创建p内的文本内容
    var desText = document.createTextNode("Choose an images");
    des.appendChild(desText);
    var ga = document.getElementById("imagegallery");
    //将描述和占位符放到图片集之后
    insertAfter(des,ga);
    insertAfter(placeholder,des);
}

function prepareGallery(){
    //点击连接时，占位符位置显示相应图片
    if(!document.getElementById("imagegallery")) return false;
    var imageGa = document.getElementById("imagegallery");
    var aArr = imageGa.getElementsByTagName("a");
    if(aArr.length==0) return false;
    for(var i=0;i<aArr.length;i++){
        aArr[i].onclick = function(){
            return showPic(this);
        }
    }
}

addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);

/**
 * 功能：间隔行设置特效
 */
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    //获取table元素
    if(!document.getElementsByTagName("table")) return false;
    //从table中获取tr元素
    var table = document.getElementsByTagName("table");
    if(table.length==0) return false;
    var trs = document.getElementsByTagName("tr");
    if(trs.length==0) return false;
    //设置标识
    var flag = false;
    for(var i=0;i<trs.length;i++){
        if(flag==true){
            addClass(trs[i],"odd");
            flag= false;
        }else{
            flag= true;
        }
    }
}

function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows= document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function(){
            this.className = this.oldClassName;
        }
    }
}

function showAbbreviations(){
    //取出所有的abbr标签
    var abbrs = document.getElementsByTagName("abbr");
    if(abbrs.length==0) return false;
    var defs = new Array();
    for(var i=0;i<abbrs.length;i++){
        if(abbrs[i].childNodes.length==0) continue;
        var title = abbrs[i].getAttribute("title");
        var abbrText = abbrs[i].firstChild.nodeValue;
        defs[title]= abbrText;
    }
    var dl = document.createElement("dl");
    for(title in defs){
        var dt = document.createElement("dt");
        var dtText = document.createTextNode(title);
        dt.appendChild(dtText);
        var dd = document.createElement("dd");
        var ddText = document.createTextNode(defs[title]);
        dd.appendChild(ddText);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    if(dl.childNodes.length<1) return false;
    //获取article标签，将dl追加上去
    var h3 = document.createElement("h3");
    var h3Text = document.createTextNode("Abbreviations");
    h3.appendChild(h3Text);
    var article = document.getElementsByTagName("article");
    if(article.length==0) return false;
    article[0].appendChild(h3);
    article[0].appendChild(dl);

    //分别显示到自定义列表中
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(showAbbreviations);

/**
 * 功能：点击label标签相对应获得焦点
 */
//function focusLabels(){
//    if(!document.getElementsByTagName) return false;
//    //获取label标签元素
//    if(!document.getElementsByTagName("label")) return false;
//    var labels = document.getElementsByTagName("label");
//    //判断label中for对应元素是否存在
//    if(labels.length==0) return false;
//    for(var i=0;i<labels.length;i++){
//        if(!labels[i].getAttribute("for")) continue;
//        var id = labels[i].getAttribute("for");
//        var ele= document.getElementById(id);
//        if(!ele) return false;
//        ele.focus();
//    }
//}
//addLoadEvent(focusLabels);

/**
 * 功能：判断是否填写
 * @param field
 * @returns {boolean}
 */
function isFilled(field){
    if(field.value.replace(' ','').length==0) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (placeholder!=field.value);
}
/**
 * 功能：验证邮件格式是否正确
 * @param field
 * @returns {boolean}
 */
function isEmail(field){
    return((field.value.indexOf("@")!=-1)&&(field.value.indexOf(".")!=-1));
}

function validateForm(whichForm){
    var ele = whichForm.elements;
    for(var i=0;i<ele.length;i++){
        if(ele[i].required=='required'){
            if(!isFilled(ele[i])){
                alert("Please fill in the "+ele[i].name+" field");
                return false;
            }
        }
        if(ele[i].type=='email'){
            if(!isEmail(ele[i])){
                alert("The "+element.name+" field must be a valid email address");
                return false;
            }
        }
    }
    return true;
}


function prepareForm(){
    var forms= document.forms;
    for(var i=0;i<forms.length;i++){
        forms[i].onsubmit = function(){
            if(!validateForm(this)) return false;
            var article = document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this,article)) return false;
            return true;
        }

    }
}

function getHTTPObject(){
    if(typeof XMLHttpRequest== 'undefined'){
        XMLHttpRequest = function(){
            try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch(e){}
            try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch(e){}
            try{ return new ActiveXObject("Msxml2.XMLHTTP");}
            catch(e){}
            return false;
        }
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var img = document.createElement("img");
    img.setAttribute("src","images/loading.gif");
    img.setAttribute("alt","Loading...");
    element.appendChild(img);
}

function submitFormWithAjax(whichForm,target){
    var request = getHTTPObject();
    if(!request) return false;
    displayAjaxLoading(target);
    //生活请求字符串
    var data = new Array();
    var eles= whichForm.elements;
    for(var i=0;i<eles.length;i++){
        data[i] = eles.name+"="+eles.value;
    }
    var dataString = data.join("&");
    var method = whichForm.getAttribute("method");
    var action = whichForm.getAttribute("action");
    request.open(method,action,true);
    request.onreadystatechange = function(){
        if(request.readyState==4){
            if(request.status==200 || request.status==0){
                var match = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(match.length>0){
                  target.innerHTML = match[1];
                }else {
                    target.innerHTML="<p>Oops,there was an error.Sorry</p>"
                }
            }else {
                target.innerHTML = "<p>"+request.statusText+"</p>";
            }
        }
    };
    request.send(dataString);
    return true;
}

addLoadEvent(prepareForm);
