var HeadBuilder;

var addHead = function(object){
    var name = object.name;
    if(object.type === "Label"){
        HeadBuilder.scope[name] = createNewLabel(HeadBuilder.scope, name, "", object.placeholder, object.postFunction);
        Builder.buildLabel(HeadBuilder.scope, "componentsView", name);
    }else if(object.type === "Combo"){
        HeadBuilder.scope[name] = createNewCombo(HeadBuilder.scope, name, "");
        //console.log(HeadBuilder.scope[name].preFunction());
        Builder.buildCombo(HeadBuilder.scope, "componentsView", name);
    }else if(object.type === "Button"){
        HeadBuilder.scope[name] = createNewButton(HeadBuilder.scope, name, object.text, object.action);
        Builder.buildButton(HeadBuilder.scope, "componentsView", name);
    }
}

HeadBuilder = {
    scope: undefined,
    add: addHead
}
