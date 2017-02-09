var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http, $compile) {

    var COMPONENTS_HEAD = [
        {
            type: "Combo",
            name: "combo",
            resource: 'http://'+RESOURCE_PATH+'/combo/get',
            refreshQuery: function(){
                return {
                    query: "select cardname from ocrd where cardtype = 'c'"
                }
            },
            precedentes: {},
            dependientes: ["label1"],
            succFunction: function(data){
                var x2js = new X2JS();
                data2 = x2js.xml_str2json(data);
                $scope["comboValueOption"] = data2.COMBO.ELEMENT;
            },
            errFunction: function(err){
                alert("Error");
            }
        },
        {
            type: "Label",
            name: "label1",
            placeholder: "codigo",
            resource: 'http://'+RESOURCE_PATH+'/label/get/',
            refreshQuery: function(){
                return {
                    query: "select cardcode from ocrd where cardname = '" + refactor($scope["comboValue"]) +"'"
                }
            },
            precedentes: {combo: false},
            dependientes: ["grill1"],
            succFunction: function(data){
                var x2js = new X2JS();
                data2 = x2js.xml_str2json(data);
                if (typeof data2.LABEL.ELEMENT === "string")
                    $scope["label1Value"] = data2.LABEL.ELEMENT;
                else
                    $scope["label1Value"] = data2.LABEL.ELEMENT[0];
            },
            errFunction: function(data){
                alert("Error");
            }
        },
        {
            type: "Button",
            name: "button1",
            text: "soy un botón",
            action: function(){
                $scope["label1"].exec($http);
            }
       }
    ]

    var COMPONENTS_BODY = {
            type: "Grill",
            name: "grill1",
            resource: 'http://'+RESOURCE_PATH+'/grilla/get/',
            refreshQuery: function(){
                return {
                    query: "exec [itsm_facturas_por_cliente] '1'"
                }
            },
            precedentes: {label1: false},
            dependientes: [],
            succFunction: function(data){
                /*
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
                }*/
            },
            errFunction: function(data){
                alert("Error");
            }
        }

    /* ---------------------------------------------*/
    /* ---------------------------------------------*/
    /* No modificar el codigo a partir de este punto*/
    /* ---------------------------------------------*/
    /* ---------------------------------------------*/

    /**
     *  Adding components to the PAGE
     */

    $scope.listComponents = COMPONENTS_HEAD;

    $scope.componentsView = [];
    $scope.componentsViewBody = [];

    HtmlBuilder.scope = $scope;
    for(var i = 0; i < $scope.listComponents.length; i++){
        console.log("p");
        HtmlBuilder.addHead($scope.listComponents[i]);
    }

    HtmlBuilder.addBody(COMPONENTS_BODY);
    

    /**
     *  Executing each component
     */

    for(item in $scope.listComponents){
        $scope[$scope.listComponents[item].name].exec($http);
    }

    $scope.ch = function(where, val){
        $scope[where] = val;
    }

    /**
     *  Refactor function to setData
     */

    var refactor = function (str) {
        var result = str.indexOf("'");
        if (result > 0) {
            var temp = str.substring(0, result + 1) + "'";
            var last = str.substring(result + 1, str.length);
            var res = refactor(last);
            return temp + res;
        } else {
            return str;
        }
    };

});
