
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

app.directive("dinamicGrill", function($compile) {
    return function(scope, element, attrs){
        
        var name = attrs['name'];
        alert(name);
        var str =   "<table class='table table-striped'>"+
                        "<thead>"+
                            "<tr>"+
                                "<th>Indice</th>"+
                                "<th ng-repeat='COL in "+name+"ValueHead track by $index'>{{COL}}</th>"+
                            "</tr>"+
                        "</thead>"+
                        //"<tbody>"+
                        //    "<tr  ng-repeat='ROW in "+name+"ValueTable' >"+
                        //        "<td ng-init='rowNum = $index + 100 * pageNum' style='cursor: not-allowed;'>{{$index + 1 + 100 * pageNum}}</td>"+
                        //        "<td ng-repeat='COL in "+name+"ValueHead track by $index' editable-Tr row='{{rowNum}}' field='{{COL}}' ng-if='COL != \"Editado\"' >{{ROW[COL].VALUE}}</td>"+
                        //    "</tr>"+
                        //"</tbody>"+
                    "</table>";
        console.log(str);
        element.append($compile(str)(scope));
        
	};
});

app.directive('editableTr', function () {
    return {
        link: function (scope, element, attrs) {
            element.css("cursor", "grab");
            element.attr('contenteditable', 'true');
            element.bind('blur keyup change', function () {
                
                if (scope.tableData[attrs.row][attrs.field].VALUE !== element.text()){
                    element.css("color", "#0288ff");
                    scope.tableData[attrs.row][attrs.field].VALUE = element.text();
                    scope.listOfChange[attrs.row] = scope.tableData[attrs.row];
                }
                console.log(scope.listOfChange);
            });
            element.bind('click', function () {
                document.execCommand('selectAll', false, null)
            });
        }
    };
});