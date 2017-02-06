
var createNewCombo = function(scope, var_In_Scope, query, post_Function){
    scope[var_In_Scope+"Value"] = "";
    scope[var_In_Scope+"ValueOption"] = ['test'];
    var comboObject = {
        type: "Combo",
        varInScope: var_In_Scope,
        scope: scope,
        valuePlace: var_In_Scope+"Value",
        optionValuePlace: var_In_Scope+"ValueOption",
        query: refreshLabel,
        precedentes: {},
        dependientes: [],
        addPrecedente: addPrecedente,
        addDependiente: addDependiente,
    /**/preFunction: preFunction,
    /**/depFunction: depFunction,
        postFunction: post_Function,
    /**/exec: exec
    };

    return comboObject;
}

var refreshLabel = function(){
    return scope[var_In_Scope+"Value"];
}

var addPrecedente = function(name){
    this.precedentes[name] = false;
}

var addDependiente = function(name){
    this.addDependiente.push(name);
}

var preFunction = function(){
    console.log(this.precedentes);
    for (var precedente in this.precedentes){
        if(!this.precedentes[precedente])
            return false;
    }
    return true;
}

var depFunction = function(){
    console.log(dependientes);
    var dep = this.dependientes;
    for(var i = 0; i < dep.length; i++){
        this.scope[dep[i]].precedentes[var_In_Scope] = true;
    }
}

var exec = async function(){
    if(!this.preFunction())
        return;
    await this.postFunction();
    this.depFunction();
}
