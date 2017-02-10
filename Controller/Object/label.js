
var createNewLabel = function(scope, var_In_Scope, place_holder, resource, refreshQuery, precedentes, dependientes, succ_Function, err_Function){
    scope[var_In_Scope+"Value"] = "";

    var labelObject = {
        type: "Label",
        placeholder : place_holder,
        varInScope : var_In_Scope,
        scope : scope,
        valuePlace : var_In_Scope+"Value",
        resource: resource,
        refreshQuery: refreshQuery,
        precedentes: precedentes,
        dependientes: dependientes,
        addPrecedente: addPrecedenteL,
        addDependiente: addDependienteL,
    /**/preFunction: preFunctionL,
    /**/depFunction: depFunctionL,
        succFunction: succ_Function,
        errFunction: err_Function,
    /**/postFunction: postFunctionL,
    /**/exec: execL
    };

    return labelObject;
}

var addPrecedenteL = function(name){
    this.precedentes[name] = false;
}

var addDependienteL = function(name){
    this.addDependiente.push(name);
}

var preFunctionL = function(){
    for (var precedente in this.precedentes){
        if(!this.precedentes[precedente])
            return false;
    }
    return true;
}

var depFunctionL = function(){
    var dep = this.dependientes;
    console.log(dep);
    for(var i = 0; i < dep.length; i++){
        this.scope[dep[i]].precedentes[this.varInScope] = true;
        console.log(this.scope[dep[i]].precedentes[this.varInScope]);
        //this.scope[dep[i]].exec();
    }
}

var execL = async function(http){
    alert("1");
    if(!this.preFunction())
        return;
    alert("2");
    var response = await this.postFunction(http);
    alert("3");
    this.succFunction(response.data);
    alert("4");
    this.scope.$digest();
    alert("5");
    this.depFunction();
    alert("termine");
}

var postFunctionL = async function(http){

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
