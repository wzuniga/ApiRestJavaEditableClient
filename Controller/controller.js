var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http, $compile) {

    $scope.listComponents = [
        {
            type: "Combo",
            name: "combo1",
            dependientes: ["label1"],
            post_Function: function(){

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
                
            }
        },
        {
            type: "Label",
            name: "label1",
            placeholder: "test de Place Holder",
            precedentes: {combo1: false},
            postFunction: function(){

            }
        },
        {
            type: "Button",
            name: "button1",
            text: "soy un botón",
            action: function(){
                var tes = $scope["button1"].text;
                console.log(tes);
            }
        }
    ]

    $scope.componentsView = [];
    HeadBuilder.scope = $scope;
    for(var i = 0; i < $scope.listComponents.length; i++){
        HeadBuilder.add($scope.listComponents[i]);
    }
    

});
