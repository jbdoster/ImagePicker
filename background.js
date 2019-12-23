// const scode = 
// `var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'https://image.shutterstock.com/image-photo/snow-globe-christmas-magic-ball-260nw-508690957.jpg';
// //   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
//   console.log(images[i]);
// }`;

/** 
 * The most sure we can be about capturing every image is 
 * searching for elements with picture extensions, .jpeg/.png/...
 */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("parsing");
    // const bfs = new DomBfs(document.body);
    const dfs = new DomDfs(document.body);
    parser;
//   chrome.tabs.executeScript(null, {
//     code: ""
//   }, function() {
//       chrome.tabs.executeScript(null, {file: 'custom.js'});
//   });
});

class DomDfs {
    constructor(dom_scope) {
        this.m.bind(this);
        this.m(dom_scope);
    }
    m(elem) {
        elem.childNodes.forEach((a) => {
            this.m(a);
        });

        if (elem.nodeName === 'IMG') {
            elem;
        }

        elem;
    }
}