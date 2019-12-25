const PLACEHOLDER_IMG_URL = "https://media.licdn.com/dms/image/C5603AQG59ADCZLrasA/profile-displayphoto-shrink_200_200/0?e=1582761600&v=beta&t=Ez6hM5GVCR9dAdv_6kBIVhA0h4YM16UP0m4Phoff6O4";
// const IMAGE_KEYWORDS = 
// https://blog.filestack.com/thoughts-and-knowledge/complete-image-file-extension-list/


const IMG_KEYWORDS =
'JPEG' || 'JPG' || 'jpeg' || 'jpeg' ||
'png' || 'image' || 'img' || 'gif'
'bitmap' || 'bmp' || 'svg';

class Nodes {
    constructor(nodes) {
        this.is_visible = false;
        this._untagged_nodes = [];
        this._tagged_nodes = [];
        this.set_dom_listener.bind(this);
        this._listener_callback.bind(this);
        this._tag.bind(this);
        this._tag(nodes);
    }

    _tag(nodes) {
        
        if (!nodes) {console.log("no nodes"); return;}
        if (nodes.length < 1) {console.log("0 nodes"); return;}

        /**
         * document.querySelectorAll("*") returns a NodeList
         * which is a "live list" managed by the DOM. This means
         * sorting can change depending on which attrs we set,
         * mainly with classes. To avoid this, we copy the elements 
         * of the list to our own object first then iterate to avoid
         * missing elements.
         */
        // for (const Node of nodes) { this._untagged_nodes.push(Node); }
        for (const node of nodes) {
            this._untagged_nodes.push(node);
            const attrs = node.getAttributeNames();
            if (!attrs) { continue; }
            for (const attr of attrs) {
                const value = node.getAttribute(attr);
                if (!value) { continue; }
                if (
                    value.includes('JPEG')  || value.includes('JPG')   || 
                    value.includes('jpeg')   || value.includes('jpeg')  ||
                    value.includes('png')    || value.includes('logo')  ||
                    value.includes('img')    || value.includes('gif')   ||
                    value.includes('bitmap') || value.includes('bmp')   || 
                    value.includes('photo')  || value.includes("base64")||
                    value.includes('displ')  || value.includes('image') || 
                    value.includes('svg')    || node.nodeType === "IMG"
                ) {
                    node.style.filter = "blur(20px)";
                    node.style.WebkitFilter = "blur(20px)";
                    node["ip-index"] = new Date().getMilliseconds().toString();
                    node.addEventListener("click", function(target) {
                        let count = 20;
                        if (this.is_visible) {
                            while (count > 0) {
                                target.style.filter = `blur(${count = count - .1}px)`;
                            }
                        } else {
                            while(count < 20) {
                                target.style.filter = `blur(${count = count + .1}px)`;
                            }
                        }
                    }.bind(this)).bind(this);
                    this._tagged_nodes.push(node);
                }
            }
        }
        console.log("tagged nodes: ", this._tagged_nodes);
        console.log("untagged nodes: ", this._untagged_nodes);
    }

    
    _listener_callback(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                const nodes = mutation.target.querySelectorAll("*");
                this._tag(nodes); 
            }
        }
    }
    
    set_dom_listener(targetNode) {
        const config = { attributes: true, childList: true, subtree: true };
        this._listener_callback = this._listener_callback.bind(this);
        this.observer = new MutationObserver(this._listener_callback);
        this.observer.observe(targetNode, config);
        // observer.disconnect();
    }
}

const nodes = new Nodes(document.querySelectorAll("*"));
nodes.set_dom_listener(document.body);
