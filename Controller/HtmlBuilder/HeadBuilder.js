var HeadBuilder;

var addHead = function(object){
    var name = object.name;
    if(object.type === "Label"){
        HeadBuilder.scope[name] = createNewLabel(HeadBuilder.scope,
                                                 object.name,
                                                 "",
                                                 object.placeholder,
                                                 object.postFunction);

        Builder.buildLabel(HeadBuilder.scope, "componentsView", name);

    }else if(object.type === "Combo"){
        HeadBuilder.scope[name] = createNewCombo(HeadBuilder.scope,
                                                 object.name,
                                                 object.resource,
                                                 object.refreshQuery,
                                                 object.precedentes,
                                                 object.dependientes,
                                                 object.succ_Function,
                                                 object.err_Function);

        Builder.buildCombo(HeadBuilder.scope, "componentsView", name);

    }else if(object.type === "Button"){
        HeadBuilder.scope[name] = createNewButton(HeadBuilder.scope,
                                                  object.name,
                                                  object.text,
                                                  object.action);
        Builder.buildButton(HeadBuilder.scope, "componentsView", name);

    }
}

HeadBuilder = {
    scope: undefined,
    add: addHead
}
