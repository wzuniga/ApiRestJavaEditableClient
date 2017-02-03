
app.directive("dinamicLabel", function($compile) {
    return function(scope, element, attrs){
        var name = attrs['name'];
        var val = scope[name]["valuePlace"];
        var valPlaceHolder = scope[name]["placeholder"];
        element.append($compile("<input type='text' class='form-control' readonly value='{{"+val+"}}' placeholder='"+valPlaceHolder+"'/>")(scope));
        console.log(element.css("margin-bottom","10px"));
	};
});
