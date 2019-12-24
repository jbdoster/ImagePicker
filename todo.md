<h1>TODO</h1>
- Ask for permissions
- Build interface contracts
- Handle exceptions for chrome/other deniable urls
- Handle the way the browser pulls images from cache, overwrite
- Lib global browser company enumeration for feature compat
-- DOM element access keys
- Whitelist hosts list
- Exclude hidden/non human visible photos
- Handle dynamic scroll loading and pagination

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


So we'll Parse DOM, scrape preexisting image elements and create new elements with highest z-index to cover the original photos.

<h2>Filter Conditions</h2>

Our particular <em>goal</em> here is to walk up the parents
until we can determine which container is actually controlling
the interaction with each img element.

Goes something like this.
- Has parent^?
-- Delimit (class, )