var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http, $compile) {

    $scope.listComponents = [
        {
            type: "Combo",
            name: "combo1",
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
                console.log(data);
                $scope["combo1ValueOption"] = data2.COMBO.ELEMENT;
            },
            errFunction: function(err){
                alert("Error");
            }
        },
        {
            type: "Label",
            name: "label1",
            placeholder: "test de Place Holder",
            precedentes: {combo1: false},
            postFunction: function(){

            }
        }/*,
        {
            type: "Button",
            name: "button1",
            text: "soy un botón",
            action: function(){
                var tes = $scope["button1"].text;
                console.log(tes);
            }
        }*/
    ]

    $scope.componentsView = [];
    HeadBuilder.scope = $scope;
    for(var i = 0; i < $scope.listComponents.length; i++){
        HeadBuilder.add($scope.listComponents[i]);
    }
    
    for(item in $scope.listComponents){
        $scope[$scope.listComponents[item].name].exec($http);
    }

});
