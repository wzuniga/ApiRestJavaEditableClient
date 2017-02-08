
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
        precedentes: precedentes,
        dependientes: dependientes,
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
    for (var precedente in this.precedentes){
        if(!this.precedentes[precedente])
            return false;
    }
    return true;
}

var depFunctionC = function(http){
    var dep = this.dependientes;
    for(var i = 0; i < dep.length; i++){
        this.scope[dep[i]].precedentes[this.varInScope] = true;
        //this.scope[dep[i]].exec(http);
    }
}

var execC = async function(http){
    if(!this.preFunction())
        return;
    var response = await this.postFunction(http);
    this.succFunction(response.data);
    this.scope.$digest();
    this.depFunction(http);
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
                });
    return prom;    
}
