var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http, $compile) {

    var COMPONENTS = [
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
                    query: "select cardcode from ocrd where cardname = '" + $scope["comboValue"] +"'"
                }
            },
            precedentes: {combo: false},
            dependientes: [],
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


    /* No modificar el codigo a partir de este punto*/
    
    $scope.listComponents = COMPONENTS;

    $scope.componentsView = [];
    HeadBuilder.scope = $scope;
    for(var i = 0; i < $scope.listComponents.length; i++){
        HeadBuilder.add($scope.listComponents[i]);
    }
    
    for(item in $scope.listComponents){
        $scope[$scope.listComponents[item].name].exec($http);
    }

    $scope.ch = function(where, val){
        $scope[where] = val;
    }
});
