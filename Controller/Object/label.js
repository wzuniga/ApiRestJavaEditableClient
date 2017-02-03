
var createNewLabel = function(scope, var_In_Scope, query, place_holder){
    scope[var_In_Scope+"Value"] = "";
    var labelObject = {
        type: "Label",
        placeholder : place_holder,
        varInScope : var_In_Scope,
        scope : scope,
        valuePlace : var_In_Scope+"Value",
        query: refreshLabel,
        precedentes: [],
        dependientes: []
    };

    return labelObject;
}

var refreshLabel = function(){
    return scope[var_In_Scope+"Value"];
}
/*
function d (val1) {
        this.scope[this.varInScope] = "select cardcode from ocrd where cardname = '" + val1 + "'";
};
*/