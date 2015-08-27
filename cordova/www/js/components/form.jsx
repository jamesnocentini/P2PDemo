var React = require('react')
    , api = require('./../utils/api');

var Form = React.createClass({
    getStyles: function() {
        return {
            container: {
                backgroundColor: 'red',
                display: 'block',
                float: 'left',
                width: '100%'
            },
            inline: {

            },
            button: {
                margin: '10px auto',
                display: 'block',
                backgroundColor: 'white',
                border: 'none',
                'borderRadius': '4px',
                'height': '30px',
                'fontSize': '15px'
            },
            input: {
                display: 'block',
                margin: '0 auto'
            },
            title: {
                fontSize: '20px',
                textAlign: 'center'
            },
            docForm: {
                margin: '20px auto',
                display: 'block',
                textAlign: 'center'
            },
            label: {
                display: 'inline-block',
                width: '60px',
                fontSize: '15px'
            }
        }
    },
    render: function() {
        var styles = this.getStyles();
        return (
            <div style={styles.container}>
                <div style={styles.docForm}>
                    <label for="input-name" style={styles.label}>Name</label>
                    <input type="text" id="input-name" />
                </div>
                <div style={styles.docForm}>
                    <label for="input-meal" style={styles.label} >Meal</label>
                    <input type="text" id="input-meal" />
                </div>
                <button onClick={this.create} style={styles.button} id="create-doc">
                    Create document
                </button>
                <p style={styles.title}>Target database:</p>
                <input id="target" ref="target" style={styles.input} type="text" />
                <button onClick={this.replicate} style={styles.button} id="replicate">Replicate</button>
            </div>
        )
    },
    replicate: function() {
        var targetUrl = document.getElementById('target').value;
        api.replicate(targetUrl);
    },
    create: function() {
        var name = document.getElementById('input-name').value;
        var meal = document.getElementById('input-meal').value;
        console.log('Saving doc :: name -> %s, meal -> %s', name, meal);
        var doc = {name: name, meal: meal};
        api.create(doc);
    },
    deleteDatabase: function() {
        api.deleteDatabase();
    }
});

module.exports = Form;