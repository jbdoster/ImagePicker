<h1>TODO</h1>
- Ask for permissions
- Build interface contracts

<h1>Considerations</h1>

<h2>DOM Parsing/Indexing</h2>

Tags don't necessary HAVE to be of type <em>img</em>
to produce an <em>image.</em> 

<em>Consider an example like StackOverflow's logo:</em>
`<span class="-img _glyph">Stack Overflow</span>`
Span tag instead of img tag means document.images = [].

For this reason, we have to parse the DOM, it's elements, and it's element's attributes see if any of them contain file extension types 
like ".png" or ".jpg". This could also be a bad way to attribute
elements, so a good tree traversing strategy can save a lot of 
headaches when making changes on what attributes we want to focus on.


So we'll Parse DOM and update node with attr <ext-name>=<hash> if it contains an image.
DFS will work O(V + E).
