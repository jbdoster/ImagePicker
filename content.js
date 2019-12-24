const PLACEHOLDER_IMG_URL = "https://media.licdn.com/dms/image/C5603AQG59ADCZLrasA/profile-displayphoto-shrink_200_200/0?e=1582761600&v=beta&t=Ez6hM5GVCR9dAdv_6kBIVhA0h4YM16UP0m4Phoff6O4";
// const IMAGE_KEYWORDS = 
// https://blog.filestack.com/thoughts-and-knowledge/complete-image-file-extension-list/


const IMG_KEYWORDS =
'JPEG' || 'JPG' || 'jpeg' || 'jpeg' ||
'png' || 'image' || 'img' || 'gif'
'bitmap' || 'bmp' || 'svg';

class Tagger {
    constructor(nodes) {
        this._untagged_nodes = [];
        this._tagged_nodes = [];
        this._tag.bind(this);
        this._tag(nodes);
    }

    _tag(nodes) {
        
        if (!nodes) {console.log("no nodes"); return;}
        if (nodes.length < 1) {console.log("0 nodes"); return;}

        for (const node of nodes) {
            this._untagged_nodes.push(node);
            const attrs = node.getAttributeNames();
            if (!attrs) { continue; }
            for (const attr of attrs) {
                const value = node.getAttribute(attr);
                if (!value) { continue; }
                if (value === "https://image-store.slidesharecdn.com/aa79c260-f81f-4225-ba05-7318c77c7541-small.png") {
                    node;
                }
                if (
                    (value.includes('JPEG')  || value.includes('JPG')   || 
                    value.includes('jpeg')   || value.includes('jpeg')  ||
                    value.includes('png')    || value.includes('image') || 
                    value.includes('img')    || value.includes('gif')   ||
                    value.includes('bitmap') || value.includes('bmp')   || 
                    value.includes('svg'))
                ) {
                    node.style.filter = "blur(20px)";
                    node.style.WebkitFilter = "blur(20px)";
                    node["ip-index"] = new Date().getMilliseconds().toString();
                    this._tagged_nodes.push(node);
                }
            }
        }
        console.log("tagged nodes: ", this._tagged_nodes);
        console.log("untagged nodes: ", this._untagged_nodes);

    }

}

const tagger = new Tagger(document.querySelectorAll("*"));
