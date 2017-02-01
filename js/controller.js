var app = angular.module('myApp', []);

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

app.controller("myCtrl", function ($scope, $http) {

    $scope.selecData = [];
    $scope.selecValue = "";

    $scope.tableData = [];
    $scope.tableHead = [];

    $scope.dataLabel = "";

    $scope.fl = false;

    $scope.styleLoader = {
        "text-align": "center"
    };
    $scope.styleTrans = {
        "width": "1px",
        "height": "1px"
    };
    $scope.styleEdited = {
        "text-align": "center",
        "width": "25px",
        "height": "25px"
    };

    $scope.refreshCombo = function () {
        $scope.uno = "select cardname from ocrd where cardtype = 'c'";
    };
    $scope.refreshLabel = function (value) {
        $scope.dos = "select cardcode from ocrd where cardname = '" + value + "'";
    };
    $scope.refreshGrilla = function (value) {
        $scope.cinco = "exec [itsm_facturas_por_cliente] '1'";
        // 0 no editables
        // 1 data
    };

    $scope.refactor = function (str) {
        var result = str.indexOf("'");
        if (result > 0) {
            var temp = str.substring(0, result + 1) + "'";
            var last = str.substring(result + 1, str.length);
            var res = $scope.refactor(last);
            return temp + res;
        } else {
            return str;
        }
    };

    $scope.refreshCombo();

    var transformReq = function (data) {
        data2 = JSON.stringify(data);
        return data2;
    };

    var transformRes = function (data) {
        return data;
    };

    $http.post('http://'+RESOURCE_PATH+'/combo/get',
            {
                query: $scope.uno
            }, {
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        transformRequest: transformReq,
        transformResponse: transformRes
    })
            .success(function (data) {
                var x2js = new X2JS();
                data2 = x2js.xml_str2json(data);
                console.log(data);
                $scope.selecData = data2.COMBO.ELEMENT;
            })
            .error(function (data) {
                alert("Error " + data);
            });


    $scope.send2 = function () {

        var strValue = $scope.refactor($scope.selecValue);

        $scope.refreshLabel(strValue);

        $http.post('http://'+RESOURCE_PATH+'/label/get/',
                {
                    query: $scope.dos
                }, {
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            transformRequest: transformReq,
            transformResponse: transformRes
        })
                .success(function (data) {
                    var x2js = new X2JS();
                    data2 = x2js.xml_str2json(data);
                    if (typeof data2.LABEL.ELEMENT === "string")
                        $scope.dataLabel = data2.LABEL.ELEMENT;
                    else
                        $scope.dataLabel = data2.LABEL.ELEMENT[0];
                    $scope.send3();
                })
                .error(function (data) {
                    alert("Error " + data);
                });
    };

    $scope.send3 = function () {
        $scope.refreshGrilla($scope.dataLabel);
        $http.post('http://'+RESOURCE_PATH+'/grilla/get/',
                {
                    query: $scope.cinco
                }, {
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            transformRequest: transformReq,
            transformResponse: transformRes
        })
                .success(function (data) {
                    var x2js = new X2JS();
                    var data2 = x2js.xml_str2json(data);
                    console.log(data);
                    $scope.tableData = data2.GRILL.ROW;
                    $scope.tableHead = data2.GRILL.NAME;

                    try {
                        if (data2.GRILL.ROW.length === undefined)
                            $scope.tableData = new Array(data2.GRILL.ROW);
                    } catch (err) {
                        console.log(err);
                    }


                    try {
                        var temp = $scope.tableData;
                        for (var i = 0; i < temp.length; i++) {
                            for (var j = 0; j < $scope.tableHead.length; j++) {
                                if (temp[i][$scope.tableHead[j]].length !== undefined)
                                    temp[i][$scope.tableHead[j]] = temp[i][$scope.tableHead[j]][0];
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }

                    $scope.imgLoaderDown();
                    console.timeEnd("TimerName");
                })
                .error(function (data) {
                    alert("Error " + data);
                });
    };

    $scope.sendInformation = function () {
        console.time("TimerName");
        var fl = $scope.selecValue === "";
        if (fl)
            return;
        $scope.tableData = [];
        $scope.tableHead = [];
        $scope.imgLoaderUp();
        $scope.send2();
    };

    $scope.imgLoaderUp = function () {
        $scope.fl = true;
    };
    $scope.imgLoaderDown = function () {
        $scope.fl = false;
    };



    /*
     Functions to change data
     */
    $scope.listOfChange = [];

    $scope.sendDataChanged = function(){

        if ($scope.listOfChange.length == 0){
            alert ("No se realizaron cambios");
            return;
        }
        $http.post('http://'+RESOURCE_PATH+'/grilla/set',
            {
                query: $scope.uno
            }, {
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            transformRequest: transformReq,
            transformResponse: transformRes
        })
            .success(function (data) {
                alert(data);
            })
            .error(function (data) {
                alert("Error " + data);
            });

    }

    $scope.getInfoFrom = function (rowIndex, colIndex) {
        rowIndex++;
        colIndex++;
        alert(rowIndex + "-" + colIndex);
    };

    $scope.editRow = function (rowIndex) {
        alert(rowIndex);
        console.log("work");
    };
});
