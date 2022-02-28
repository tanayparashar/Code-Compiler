var codee=document.getElementById("code");
var select=document.getElementById("select");
var lang="Python";
var langcode=0;
var obj={Python : "0" , JavaScript : "4" , C : "7" , CPP : "77" , Java : "8"};
select.addEventListener("change",function (event)
{
    lang=(event.target.value);
    langcode=obj[lang];
    //console.log(code);event.target.responseText
});
var compile=document.getElementById("compile");
compile.addEventListener("click",function (event)
{
    var getId=null;
    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type","application/json");
    request.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        }
    }
    request.send(JSON.stringify( { "code":codee.value , langId:langcode} ));
    request.addEventListener("load", function(event)
    {
        getId=JSON.parse(event.target.responseText).codeId;
        console.log(getId);
        setTimeout( function(){
            var request = new XMLHttpRequest();
            request.open("GET",`https://codequotient.com/api/codeResult/${getId}`);
            request.send();
            request.addEventListener("load", function(event)
            {
                var val=JSON.parse(event.target.responseText);
                //console.log(val);
                document.getElementById("output").value=val.data;
            });
        }, 5000);
    });
});



