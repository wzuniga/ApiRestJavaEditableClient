
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
        var str = "<select ng-model='"+val+"' class='form-control margin-dinamic'>"+
                        "<option ng-repeat='OPT in "+optionVal+" track by $index' value='{{OPT}}'>{{OPT}}</option>"+
                  "</select>";
        element.append($compile(str)(scope));
	};
});

app.directive("dinamicButton", function($compile) {
    return function(scope, element, attrs){
        var name = attrs['name'];
        var val = scope[name]["valuePlace"];
        var optionVal = scope[name]["optionValuePlace"];
        var str = "<select ng-model='"+val+"' class='form-control margin-dinamic'>"+
                        "<option ng-repeat='OPT in "+optionVal+" track by $index' value='{{OPT}}'>{{OPT}}</option>"+
                  "</select>";
        element.append($compile(str)(scope));
	};
});