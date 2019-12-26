const PLACEHOLDER_IMG_URL = "https://media.licdn.com/dms/image/C5603AQG59ADCZLrasA/profile-displayphoto-shrink_200_200/0?e=1582761600&v=beta&t=Ez6hM5GVCR9dAdv_6kBIVhA0h4YM16UP0m4Phoff6O4";
// const IMAGE_KEYWORDS = 
// https://blog.filestack.com/thoughts-and-knowledge/complete-image-file-extension-list/


const IMG_KEYWORDS =
'JPEG' || 'JPG' || 'jpeg' || 'jpeg' ||
'png' || 'image' || 'img' || 'gif'
'bitmap' || 'bmp' || 'svg';

class Nodes {
    constructor(nodes) {

        this._untagged_nodes = [];
        this._tagged_nodes = [];

        this._tag.bind(this);
        this._listener_callback.bind(this);
        this.set_dom_listener.bind(this);
        
        this._tag(nodes);
    }

    /**
     *  @param {HTMLElement[]} nodes
     *  for each node:
     *  a) Filter for image within any attribute value
     *  b) Set css attributes
     *  c) Swap it's onclick event
     *  d) Save update node in @param _tagged_nodes
     */
    _tag(nodes) {
        
        if (!nodes) {console.log("no nodes"); return;}
        if (nodes.length < 1) {console.log("0 nodes"); return;}

        /**
         * a)
         * document.querySelectorAll("*") returns a NodeList
         * which is a "live list" managed by the DOM. This means
         * sorting can change depending on which attrs we set,
         * mainly with classes. To avoid this, we copy the elements 
         * of the list to our own object first then iterate to avoid
         * missing elements.
         */
        for (const node of nodes) {

            const node_index = node["ip-index"];
            if (node_index) {
                const clicked_node = chrome.storage.local.get(node_index, function(){});
                if (clicked_node) { continue; }
            }

            const attrs = node.getAttributeNames();
            if (!attrs) { continue; }
            this._untagged_nodes.push(node);
            
            for (const attr of attrs) {
                const value = node.getAttribute(attr);
                if (!value) { continue; }
                if (
                    value.includes('JPEG')   || value.includes('JPG')   || 
                    value.includes('jpeg')   || value.includes('jpeg')  ||
                    value.includes('png')    || value.includes('logo')  ||
                    value.includes('img')    || value.includes('gif')   ||
                    value.includes('bitmap') || value.includes('bmp')   || 
                    value.includes('photo')  || value.includes("base64")||
                    value.includes('displ')  || value.includes('image') || 
                    value.includes('svg')    || node.nodeType === "IMG"
                ) {

                    /** b) */
                    node.style.filter = "blur(20px)";
                    node.style.WebkitFilter = "blur(20px)";
                    node["ip-index"] = new Date().getMilliseconds().toString();

                    /** c) */
                    node.addEventListener("click", function(event) {
                        console.log(
                        `node ${event.target["ip-index"]} clicked with keydown: ${event.ctrlKey}`
                        );
                        
                        /** 
                         *  Elements can cover other elements, makes it hard to
                         *  reference the element the user actually intends to
                         *  click on. Which element is closest then?
                         */
                        let difference = 100000000;
                        let matched = false;
                        let nearest_element = 
                        this._tagged_nodes[0];
                        for (var node in this._tagged_nodes) {
                            const difference_x = Math.abs(node.x - event.target.x);
                            const difference_y = Math.abs(node.y - event.target.y);
                            const difference_  = (difference_x/difference_y);
                            if (typeof difference === typeof 0 && difference_ < difference) {
                                console.log("node matched");
                                matched = true;
                                nearest_element = node;
                                break;
                            }
                        }

                        if (matched) {
                            chrome.storage.local.set({[event.target["ip-index"]]: {clicked:true}});
    
                            let count = 20;
                            while (count > 0) {
                                console.log("that count: ", count);
                                event.target.style.filter = `blur(${count = count - .1}px)`;
                            }
                        }

                    }.bind(this));

                    /** d) */
                    this._tagged_nodes.push(node);
                }
            }
        }
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
