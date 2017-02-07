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
            succ_Function: function(){
                alert("succ");
            },
            err_Function: function(){
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
        //console.log($scope.listComponents[item].name);
        $scope[$scope.listComponents[item].name].exec($http);
    }

});
