var React = require('react')
    , api = require('./../utils/api');

var List = React.createClass({
    getStyles: function() {
        return {
            column: {
                width: '100px',
                textAlign: 'left'
            },
            myTable: {
                margin: '0 auto',
                textAlign: 'center'
            },
            button: {
                margin: '10px auto',
                display: 'block',
                backgroundColor: 'white',
                border: 'none',
                'borderRadius': '4px',
                'height': '30px',
                'fontSize': '15px'
            }
        };
    },
    getInitialState: function() {
        return {
            docs: []
        };
    },
    componentDidMount: function() {
        var self = this;
        api.listen(function(docs) {
            api.allDocs()
                .then((res) => {
                    self.setState({
                        docs: res.rows
                    })
                });
        });

    },
    render: function () {
        var self = this;
        var styles = this.getStyles();

        var docs = this.state.docs.map(function (doc, i) {
            return (
                <tr data-id={i} key={i}>
                    <td style={styles.column}>{doc.id.substring(0, 5)}</td>
                    <td style={styles.column}>{doc.doc._rev.substring(0, 8)}</td>
                    <td style={styles.column}>{doc.doc.name}</td>
                    <td style={styles.column}>{doc.doc.meal}</td>
                    <td>
                        <button onClick={self.deleteDocument.bind(self, doc.id, doc.doc._rev)} style={styles.button}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <table style={styles.myTable}>
                    <tr>
                        <th style={styles.column}>Id</th>
                        <th style={styles.column}>Rev</th>
                        <th style={styles.column}>Name</th>
                        <th style={styles.column}>Meal</th>
                        <th style={styles.column}></th>
                    </tr>
                    {docs}
                </table>
            </div>
        );
    },
    deleteDocument: function(id, rev) {
        api.deleteDocument(id, rev);
    }
});

module.exports = List;