function getStatus(){}function roosterLaden(a,b){$("body").addClass("rooster-actief"),a&&b?$.get("/rooster/"+a+"/"+b,function(c){weeknr=b,weeknrVolgende=weeknr+1,weeknrVorige=weeknr-1,$(".hetrooster").html(c),$(".js-weeknr-show").text(weeknr),$(".js-klas-show").text(a.replace(/;/g,", ")),$(".js-permalink-toggle").show();var d=appUrl+"/"+a;$(".js-permalink").text(d).attr("href",d),$(".js-alleszien:parent").addClass("show-for-small-only"),$(".js-ajax-error").hide(),laatAllesZien(),history.pushState(null,null,"/"+a+"/"+weeknr),everLoaded=!0,getStatus()}):(selectize.setValue(""),$(".js-permalink-toggle").hide(),$(".hetrooster").html(""),$("body").removeClass("rooster-actief"),$(".js-weeknr-show").text(weeknrHuidig),$(".js-klas-show").text(""),history.pushState(null,null,"/"))}function roosterLink(a){klasOrig=a,roosterLaden(a,weeknrHuidig),$(".js-klas").val(a)}function keyUpFix(){$(document).on("keyup",function(a){37===a.keyCode?(weeknrInput=weeknr-1,0===weeknrInput&&(weeknrInput=52),roosterLaden(klasOrig,weeknrInput)):39===a.keyCode&&(weeknrInput=weeknr+1,53==weeknrInput&&(weeknrInput=1),roosterLaden(klasOrig,weeknrInput))})}function laatAllesZien(){allesZien===!0&&($(".dag").removeClass("hide-for-small-only"),$(".controls").show(),$(".js-alleszien:parent").hide())}function popupOpenen(a){$.get("/"+a,function(a){$(".popup").html(a),$(".popup-achtergrond").fadeIn(200),$(".popup").fadeIn(200)}),$(document).on("keyup",function(a){27===a.keyCode&&popupSluiten()})}function popupSluiten(){$(".popup-achtergrond").fadeOut(200),$(".popup").fadeOut(200),$(document).off("keyup"),keyUpFix()}var everLoaded=!1,$select,selectize;$(function(){$.getJSON(appUrl+"/jsoninput",function(a){items=a.map(function(a){return{item:a}}),$select=$(".js-klas").selectize({delimiter:";",create:!1,openOnFocus:!1,options:items,selectOnTab:!0,hideSelected:!0,persist:!1,labelField:"item",valueField:"item",searchField:"item",onChange:function(a){roosterLaden(a,weeknrHuidig)}}),selectize=$select[0].selectize}),$(document).ajaxError(function(){$(".js-ajax-error").show()}),$(".js-vorige").on("click",function(a){a.preventDefault(),weeknrInput=weeknr-1,0===weeknrInput&&(weeknrInput=52),roosterLaden(klasOrig,weeknrInput)}),$(".js-huidige").on("click",function(a){a.preventDefault(),roosterLaden(klasOrig,weeknrHuidig)}),$(".js-volgende").on("click",function(a){a.preventDefault(),weeknrInput=weeknr+1,53==weeknrInput&&(weeknrInput=1),roosterLaden(klasOrig,weeknrInput)}),$(".js-home").on("click",function(a){a.preventDefault(),roosterLaden(null,null)}),$(".hetrooster").on("click",".js-roosterlink",function(a){a.preventDefault();var b=$(this).attr("href").replace(/^\/|\/$/g,"");roosterLink(b)}),$(".js-alleszien").on("click",function(a){a.preventDefault(),allesZien=!0,laatAllesZien()}),$(window).on("popstate",function(){everLoaded&&(newLink=history.location||document.location,newLink=newLink.toString(),newLink=newLink.split("/"),weeknrInput=parseInt(newLink[4]),roosterLaden(newLink[3],weeknrInput)),everLoaded=!0}),keyUpFix()}),$(function(){$(".js-popup").on("click",function(a){a.preventDefault();var b=$(this).attr("href");popupOpenen(b)}),$(".popup").on("click",".sluit-popup",function(a){a.preventDefault(),popupSluiten()}),$(".popup").on("click",".cheat-link",function(a){a.preventDefault(),roosterLink($(this).text()),popupSluiten()})});