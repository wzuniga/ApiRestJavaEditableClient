
var createNewGrill = function(scope, var_In_Scope, resource, refreshQuery, precedentes, dependientes, succ_Function, err_Function){
    scope[var_In_Scope+"ValueTable"] = [];
    scope[var_In_Scope+"ValueHead"] = [];

    var grillObject = {
        type: "Grill",
        varInScope : var_In_Scope,
        scope : scope,
        valuePlace : var_In_Scope+"Value",
        resource: resource,
        refreshQuery: refreshQuery,
        precedentes: precedentes,
        dependientes: dependientes,
        addPrecedente: addPrecedenteG,
        addDependiente: addDependienteG,
    /**/preFunction: preFunctionG,
    /**/depFunction: depFunctionG,
        succFunction: succ_Function,
        errFunction: err_Function,
    /**/postFunction: postFunctionG,
    /**/exec: execG
    };

    console.log(precedentes);
    return grillObject;
}

var addPrecedenteG = function(name){
    this.precedentes[name] = false;
}

var addDependienteG = function(name){
    this.addDependiente.push(name);
}

var preFunctionG = function(){
    console.log(this.precedentes);
    for (var precedente in this.precedentes){
        if(!this.precedentes[precedente])
            return false;
    }
    return true;
}

var depFunctionG = function(){
    var dep = this.dependientes;
    console.log(dep);
    console.log("grill");
    for(var i = 0; i < dep.length; i++){
        this.scope[dep[i]].precedentes[this.varInScope] = true;
        //this.scope[dep[i]].exec();
    }
}

var execG = async function(http){
    
    if(!this.preFunction())
        return;
    alert("pase");
    var response = await this.postFunction(http);
    this.succFunction(response.data);
    this.scope.$digest();
    this.depFunction();
    console.log("sipase");
}

var postFunctionG = async function(http){

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
