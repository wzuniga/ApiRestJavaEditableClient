var HeadBuilder;

var addHead = function(object){
    var name = object.name;
    if(object.type === "Label"){
        HeadBuilder.scope[name] = createNewLabel(HeadBuilder.scope, name, "", object.placeholder);
        Builder.buildLabel(HeadBuilder.scope, "componentsView", name);
    }else if(object.type === "Combo"){
        HeadBuilder.scope[name] = createNewCombo(HeadBuilder.scope, name, "", object.placeholder);
        Builder.buildCombo(HeadBuilder.scope, "componentsView", name);
    }
}

HeadBuilder = {
    scope: "",
    add: addHead
}