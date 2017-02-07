
var createNewCombo = function(scope, var_In_Scope, resource, refreshQuery, precedentes, dependientes, succ_Function, err_Function){
    scope[var_In_Scope+"Value"] = "";
    scope[var_In_Scope+"ValueOption"] = ['test'];
    scope[var_In_Scope+"Query"] = "";
    var comboObject = {
        type: "Combo",
        varInScope: var_In_Scope,
        scope: scope,
        valuePlace: var_In_Scope+"Value",
        optionValuePlace: var_In_Scope+"ValueOption",
        resource: resource,
        refreshQuery: refreshQuery,
        precedentes: {},
        dependientes: [],
        addPrecedente: addPrecedenteC,
        addDependiente: addDependienteC,
    /**/preFunction: preFunctionC,
    /**/depFunction: depFunctionC,
        succFunction: succ_Function,
        errFunction: err_Function,
    /**/postFunction: postFunctionC,
    /**/exec: execC
    };

    return comboObject;
}

var addPrecedenteC = function(name){
    this.precedentes[name] = false;
}

var addDependienteC = function(name){
    this.addDependiente.push(name);
}

var preFunctionC = function(){
    console.log(this.precedentes);
    alert("pass over");
    for (var precedente in this.precedentes){
        if(!this.precedentes[precedente])
            return false;
    }
    return true;
}

var depFunctionC = function(){
    console.log(dependientes);
    var dep = this.dependientes;
    for(var i = 0; i < dep.length; i++){
        this.scope[dep[i]].precedentes[var_In_Scope] = true;
        this.scope[dep[i]].exec();
    }
}

var execC = async function(http){
    alert("pass by exec");
    if(!this.preFunction())
        return;
    alert("pass pre");
    await this.postFunction(http);
    alert("works!!");
    this.depFunctionC();
}

var postFunctionC = async function(http){

    var transformReq = function (data) {
        data2 = JSON.stringify(data);
        return data2;
    };

    var transformRes = function (data) {
        return data;
    };

    var prom = http.post(this.resource,this.refreshQuery(), {
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    transformRequest: transformReq,
                    transformResponse: transformRes
                });/*
                .success(function (data) {
                    var x2js = new X2JS();
                    data2 = x2js.xml_str2json(data);
                    console.log(data);
                    $scope.selecData = data2.COMBO.ELEMENT;
                })
                .error(function (data) {
                    alert("Error " + data);
                });*/
    return prom;    
}
