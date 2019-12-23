const PLACEHOLDER_IMG_URL = "https://media.licdn.com/dms/image/C5603AQG59ADCZLrasA/profile-displayphoto-shrink_200_200/0?e=1582761600&v=beta&t=Ez6hM5GVCR9dAdv_6kBIVhA0h4YM16UP0m4Phoff6O4";

class Tagger {
    constructor(nodes) {
        this.nodes = [];
        this._tag(nodes);
    }

    _tag(nodes) {
        nodes.forEach((node, index)=>{
            if (node.hasAttribute("src")) {
                node.setAttribute("swap-src", 
                    node.getAttribute("src")
                );
                node.setAttribute("src", PLACEHOLDER_IMG_URL);
            }
        });
    }
}

new Tagger(document.body.querySelectorAll("*"));