var HeadBuilder;

var addHead = function(object){
    var name = object.name;
    if(object.type === "Label")
        HeadBuilder.scope[name] = createNewLabel(HeadBuilder.scope, name, "", object.placeholder);

    Builder.buildLabel(HeadBuilder.scope, "componentsView", name);
}

HeadBuilder = {
    scope: "",
    add: addHead
}