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

        var styles = this.getStyles();

        var docs = this.state.docs.map(function (doc, i) {
            return (
                <tr>
                    <td style={styles.column}>{i}</td>
                    <td style={styles.column}>{doc.doc.name}</td>
                    <td style={styles.column}>{doc.doc.meal}</td>
                </tr>
            );
        });

        return (
            <div>
                <table style={styles.myTable}>
                    <tr>
                        <th style={styles.column}>Number</th>
                        <th style={styles.column}>Name</th>
                        <th style={styles.column}>Meal</th>
                    </tr>
                    {docs}
                </table>
            </div>
        );
    }
});

module.exports = List;