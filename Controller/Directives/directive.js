
app.directive("dinamicLabel", function($compile) {
    return function(scope, element, attrs){
        var name = attrs['name'];
        var val = scope[name]["valuePlace"];
        var valPlaceHolder = scope[name]["placeholder"];
        var str = "<input type='text' class='form-control margin-dinamic' readonly value='{{"+val+"}}' placeholder='"+valPlaceHolder+"'/>"
        element.append($compile(str)(scope));
	};
});

app.directive("dinamicCombo", function($compile) {
    return function(scope, element, attrs){
        var name = attrs['name'];
        var val = scope[name]["valuePlace"];
        var optionVal = scope[name]["optionValuePlace"];
        var str = "<select ng-options='OPT for OPT in "+optionVal+"' ng-init='temp = \""+val+"\"' ng-model='"+val+"' ng-change='ch(temp, "+val+")' class='form-control margin-dinamic'>"+

                  "</select>";
        element.append($compile(str)(scope));
	};
});

app.directive("dinamicButton", function($compile) {
    return function(scope, element, attrs){
        var name = attrs['name'];
        var functionPath = scope[name]["actionPath"];
        var text = scope[name]["text"];
        var str = "<button ng-click='"+functionPath+"()' class='btn btn-info'>"+text+
                  "</button>";
        element.append($compile(str)(scope));
	};
});
