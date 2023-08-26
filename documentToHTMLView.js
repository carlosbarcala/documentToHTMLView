/**
 * documentToHTMLView v0.6
 * Author:    Carlos Barcala Pérez
 * Created:   30.10.2022
 * 
 * (c) Creativo Tecnológico.
 * 
 * GNU General Public License v3.0
 * 
 * Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, 
 * which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. 
 * Contributors provide an express grant of patent rights.
 **/

Document.prototype.toHTMLView = function() {
    const node = this.firstChild;
    if( typeof this.render !== 'function')
        this.renderDocument = function(node, level = 0, tabSize = 10 ) {
        if ( node == null ) 
            return '';
        let html = '';
        if ( node.nodeType == Node.DOCUMENT_TYPE_NODE ) {
            html += '<span class="document-type">&lt!DOCTYPE '+node.nodeName+'&gt</span><br/>';
            html += this.renderDocument( node.nextSibling );
        } else 
        if ( node.nodeType == Node.COMMENT_NODE ) {
            if( level )
                html += '<span style="padding: 0 '+level*tabSize+'px;"></span>';
            html += '<span class="document-type">&lt!-- '+node.nodeValue+'--&gt</span><br/>';
            html += this.renderDocument( node.nextSibling );
        } else 
        if( node.nodeType == Node.TEXT_NODE ) {
            let text = node.nodeValue.trim();
            if( text.length ) {
                if( level )
                    html += '<span style="padding: 0 '+level*tabSize+'px;"></span>';
                html += '<span class="element-value">'+text+'</span><br/>';
            }
        } else 
        if( node.nodeType == Node.CDATA_SECTION_NODE ) {
            let text = node.nodeValue.trim();
            if( text.length ) {
                if( level )
                    html += '<span style="padding: 0 '+level*tabSize+'px;"></span>';
                html += '<span class="cdata-value">'+text+'</span><br/>';
            }
        } else 
        {
            if( level )
                html += '<span style="padding: 0 '+level*tabSize+'px;"></span>';
            html += '<span class="element">&lt'+node.nodeName+'</span>';
            if( node.hasAttributes() ) {
                for( const attribute of node.attributes ) {
                html += '<span class="attribute-name">'+attribute.nodeName+'</span>' +
                        '<span class="element">="</span>' +
                        '<span class="attribute-value">'+attribute.nodeValue+'</span>' +
                        '<span class="element">"</span>';
                }
            }
            html +=  '<span class="element">&gt;</span><br/>';
            if ( node.hasChildNodes() ) {
                for( let childNode of node.childNodes )
                html += this.renderDocument( childNode, level + 1 );
            } 
            if( level ) {
                html += '<span style="padding: 0 '+level*tabSize+'px;"></span>';
            }
            html +=  '<span class="element">&lt/'+node.nodeName+'&gt;</span><br/>';
        }
        return html;
      }
      
    return this.renderDocument(node);
}
