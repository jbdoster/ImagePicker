const PLACEHOLDER_IMG_URL = "https://media.licdn.com/dms/image/C5603AQG59ADCZLrasA/profile-displayphoto-shrink_200_200/0?e=1582761600&v=beta&t=Ez6hM5GVCR9dAdv_6kBIVhA0h4YM16UP0m4Phoff6O4";
// const IMAGE_KEYWORDS = 
// https://blog.filestack.com/thoughts-and-knowledge/complete-image-file-extension-list/

class Tagger {
    constructor(nodes) {
        this.nodes = [];
        this._tag.bind(this);
        this._tag(nodes);
    }

    _tag(nodes) {

        if (!nodes) {console.log("no nodes"); return;}
        if (nodes.length < 1) {console.log("0 nodes"); return;}

        for (const node of nodes) {
            const attrs = node.getAttributeNames();
            for (const attr of attrs) {
                const value = node.getAttribute(attr);
                if (!value) { continue; }
                if (value.includes("png" || "jpg")) {
                    const index = new Date().getMilliseconds().toString();
                    const Node = {
                    "ip-index": index,
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    naturalWidth: node.naturalWidth,
                    naturalHeight: node.naturalHeight
                    }
                    this.nodes.push(Node);

                    const element = document.createElement("IMG");
                    element.x = node.x;
                    element.y = node.y;
                    element.width  = node.width;
                    element.height = node.height;
                    element.naturalWidth  = node.naturalWidth;
                    element.naturalHeight = node.naturalHeight;
                    element.src = node.src;
                    element.alt = node.alt;

                    element.setAttribute("ip-clone-index", index);
                    element.setAttribute("x", node.x);
                    element.setAttribute("y", node.y);
                    element.setAttribute("width", node.width);
                    element.setAttribute("height", node.height);
                    element.setAttribute("naturalWidth", node.naturalWidth);
                    element.setAttribute("naturalHeight", node.naturalHeight);
                    element.setAttribute("src", PLACEHOLDER_IMG_URL);
                    element.setAttribute("alt", PLACEHOLDER_IMG_URL);
                    element
                    // this.addEventListener("onChange", ()=>{});
                    document.body.appendChild(element);
                    console.log("cloned")
                }
            }
        }
        console.log("cloned nodes: ", this.nodes);
    }
}

const tagger = new Tagger(document.querySelectorAll("*"));
