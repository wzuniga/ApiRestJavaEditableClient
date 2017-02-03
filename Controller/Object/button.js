
var createNewCombo = function(scope, var_In_Scope, query, place_holder, post_Function){
    scope[var_In_Scope+"Value"] = "";
    scope[var_In_Scope+"ValueOption"] = ['test'];
    var comboObject = {
        type: "Combo",
        placeholder: place_holder,
        varInScope: var_In_Scope,
        scope: scope,
        valuePlace: var_In_Scope+"Value",
        optionValuePlace: var_In_Scope+"ValueOption",
        query: refreshLabel,
        precedentes: [],
        dependientes: [],
        postFunction: post_Function,
        
    };

    return comboObject;
}

var refreshLabel = function(){
    return scope[var_In_Scope+"Value"];
}
/*
function d (val1) {
        this.scope[this.varInScope] = "select cardcode from ocrd where cardname = '" + val1 + "'";
};
*/