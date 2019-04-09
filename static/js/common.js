var pathUrl = window.location.origin;
//新建
$("#btn1").on("click", function () {
    $("#main").empty().focus();
    $("#pathBlock").css("display","none")
});  

function getInfo(id){
    var id = $("#textId").val()?$("#textId").val():id;
    if(!id)return;
    $.ajax({
        url: pathUrl + "/getCode/"+id,
        type: 'GET',
        async: true, 
        success: function (msg) {
            console.log(msg);
            if (msg.data){
                $("#main").empty().append(msg.data.info)
                hljs.initHighlightingOnLoad();
                hljs.highlightBlock(document.querySelector('pre code'));
            }
            // [].forEach.call(document.querySelectorAll('pre code'), function(block){
            //     hljs.highlightBlock(block);
            // });
        },
        error: function (err) {}
    })
}
//查询
$("#btn2").on("click", function () {
    $("#pathBlock").css("display","none")
    getInfo();
});

//监听文本发生变化后hljs渲染
$('#main').on('input propertychange', function() { 
    // console.info($(this).html()) 
    // var infos = $($(this).html());
    // $(this).html($(this).text().replace(/[\n\r]/g, '<br>'))
    // $(this).empty().append(infos);
    // hljs.initHighlightingOnLoad();
    $(this).prop("class",$("#changeLaun option:selected").val());
    hljs.highlightBlock(document.querySelector('pre code'));
});

//保存
$("#btn3").on("click", function () {
    var infos = $("#main").html();
    if(!infos)return;
    $.ajax({
        url: pathUrl + "/setCode",
        type: 'post',
        data:{
           infos:infos
        },
        success: function (msg) {
            console.log(msg);
            $("#pathBlock").css("display","inline-flex");
            $("#pathId").val(window.location.host +"/codes/"+ msg.data.id);
        },
        error: function (err) {
           
        }
    })
});

//样式下拉
function initHLSelect(){
    // styleArr = ["agate.css","androidstudio.css","arduino-light.css","arta.css","ascetic.css","atelier-cave-dark.css","atelier-cave-light.css","atelier-dune-dark.css","atelier-dune-light.css","atelier-estuary-dark.css","atelier-estuary-light.css","atelier-forest-dark.css","atelier-forest-light.css","atelier-heath-dark.css","atelier-heath-light.css","atelier-lakeside-dark.css","atelier-lakeside-light.css","atelier-plateau-dark.css","atelier-plateau-light.css","atelier-savanna-dark.css","atelier-savanna-light.css","atelier-seaside-dark.css","atelier-seaside-light.css","atelier-sulphurpool-dark.css","atelier-sulphurpool-light.css","brown-paper.css","codepen-embed.css","color-brewer.css","dark.css","darkula.css","default.css","docco.css","dracula.css","far.css","foundation.css","github.css","github-gist.css","googlecode.css","grayscale.css","gruvbox-dark.css","gruvbox-light.css","hopscotch.css","hybrid.css","idea.css","ir-black.css","kimbie.dark.css","kimbie.light.css","magula.css","mono-blue.css","monokai.css","monokai-sublime.css","obsidian.css","paraiso-dark.css","paraiso-light.css","pojoaque.css","purebasic.css","qtcreator_dark.css","qtcreator_light.css","railscasts.css","rainbow.css","school-book.css","solarized-dark.css","solarized-light.css","sunburst.css","tomorrow.css","tomorrow-night.css","tomorrow-night-blue.css","tomorrow-night-bright.css","tomorrow-night-eighties.css","vs.css","xcode.css","xt256.css","zenburn.css"];
    styleArr = ['monokai-sublime.css'];
    selectHtml = [];
	selectHtml.push('<select id="changeStyle">');
	for(i in styleArr) {
		OptionValue = styleArr[i];
		selectHtml.push('<option value="' + OptionValue +'" >'+ OptionValue +'</option>');
	}
	selectHtml.push('</select>');
	var selectHtmlString = selectHtml.join("");
	document.getElementById('changeStyleSelect').innerHTML = selectHtmlString;	
    var obj = document.getElementById('changeStyle');
    document.createElement('link').setAttribute('href','../static/highlight/monokai-sublime.css');
    $("#changeStyle").val('monokai-sublime.css');
	obj.addEventListener("change",function(event){
		var value = this.options[this.options.selectedIndex].value;    
		l = document.createElement('link');
		l.setAttribute('href','../static/highlight/'+value);
		l.setAttribute('rel','stylesheet');
		document.head.appendChild(l);
	});
}
// initHLSelect();

//语言下拉
function initLaunSelect(){
    var lanArr = hljs.listLanguages().sort();
	sel = [];
	sel.push('<select id="changeLaun">');
	for(i in lanArr) {
		OptionValue = lanArr[i];
		sel.push('<option value="' + OptionValue +'" >'+ OptionValue +'</option>');
	}
	sel.push('</select>');
	var selectHtmlString = sel.join("");
	document.getElementById('changeLaunSelect').innerHTML = selectHtmlString;
    var obj = document.getElementById('changeLaun');
    $("#changeLaun").val('javascript');
	obj.addEventListener("change",function(event){
		var value = this.options[this.options.selectedIndex].value;    
        console.log(value)
        $("#main").prop("class",value);
        hljs.initHighlightingOnLoad(); 
        hljs.highlightBlock(document.querySelector('pre code'));
        // [].forEach.call(document.querySelectorAll('pre code'), function(block){
        //     hljs.highlightBlock(block);
        // });
	});
}
initLaunSelect();

(function(){
    // hljs.configure({useBR: true});
    hljs.initHighlightingOnLoad();
    $("#pathBlock").css("display","none")
    var id = $("#specialId").html()
    if(!id)return;
    getInfo(id);
})()

//复制链接
$("#copyId").on("click", function () {
    $("#pathId").select(); 
    document.execCommand("Copy"); 
});