var HtmlBuilder;

var addHead = function(object){
    var name = object.name;
    if(object.type === "Label"){
        HtmlBuilder.scope[name] = createNewLabel(HtmlBuilder.scope,
                                                 object.name,
                                                 object.placeholder,
                                                 object.resource,
                                                 object.refreshQuery,
                                                 object.precedentes,
                                                 object.dependientes,
                                                 object.succFunction,
                                                 object.errFunction);

        Builder.buildLabel(HtmlBuilder.scope, "componentsView", name);

    }else if(object.type === "Combo"){
        HtmlBuilder.scope[name] = createNewCombo(HtmlBuilder.scope,
                                                 object.name,
                                                 object.resource,
                                                 object.refreshQuery,
                                                 object.precedentes,
                                                 object.dependientes,
                                                 object.succFunction,
                                                 object.errFunction);

        Builder.buildCombo(HtmlBuilder.scope, "componentsView", name);

    }else if(object.type === "Button"){
        HtmlBuilder.scope[name] = createNewButton(HtmlBuilder.scope,
                                                  object.name,
                                                  object.text,
                                                  object.action);
        Builder.buildButton(HtmlBuilder.scope, "componentsView", name);

    }
}

var addBody = function(object){
    
    var name = object.name;

    function isEmptyJSON(obj) {
        for(var i in obj) { return false; }
        return true;
    }   

    if(isEmptyJSON(object)){
        return;
    }
    
    if(object.type === "Grill"){
        HtmlBuilder.scope[name] = createNewGrill(HtmlBuilder.scope,
                                                 object.name,
                                                 object.resource,
                                                 object.refreshQuery,
                                                 object.precedentes,
                                                 object.dependientes,
                                                 object.succFunction,
                                                 object.errFunction);
        Builder.buildButton(HtmlBuilder.scope, "componentsViewBody", name);

    }
}

HtmlBuilder = {
    scope: undefined,
    addHead: addHead,
    addBody: addBody
}
