# documentToHTMLView
Render the content of the 'Document' object ( Javascript ) into HTML code.

## Usage

### Add to head
```html
<link href="documentToHTMLView.css" rel="stylesheet"/>
<script src="documentToHTMLView.js"></script>
```

# How to use
### Code
```javascript
const textXML = "<note>" +
    "<to>Tove</to>" +
    "<from>Jani</from>" +
    "<heading>Reminder</heading>" +
    "<content>Don't forget me this weekend!</content>" +
    "</note>";
let parser = new DOMParser();
let dom = parser.parseFromString( textXML , 'text/xml');
document.querySelector('.view-xml').innerHTML = dom.toHTMLView();
```

## License

This project is licensed to you under the [GNU General Public License v3.0](./LICENSE) open source license.
