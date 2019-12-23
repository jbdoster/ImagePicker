class Tagger {
    constructor(nodes) {
        this._tag(nodes);
    }

    _tag(nodes) {
        nodes.forEach(node=>{
            console.log(node);
        });
    }
}

new Tagger(document.body.querySelectorAll("*"));