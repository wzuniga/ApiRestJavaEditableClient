
var createNewButton = function(scope, var_In_Scope, text, action){
    var tt = "dd";
    scope[var_In_Scope+"Function"] = action;
    var buttonObject = {
        type: "Button",
        text: text,
        varInScope: var_In_Scope,
        scope: scope,
        actionPath: var_In_Scope+"Function",
        test: scope[var_In_Scope+"Function"]
    };

    return buttonObject;
}

var refreshLabel = function(){
    return scope[var_In_Scope+"Value"];
}
/*
function d (val1) {
        this.scope[this.varInScope] = "select cardcode from ocrd where cardname = '" + val1 + "'";
};
*/
