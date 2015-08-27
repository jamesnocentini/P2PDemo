var React = require('react')
    , Form = require('./components/form.jsx')
    , List = require('./components/list.jsx')
    , api = require('./utils/api');

var App = React.createClass({
    componentDidMount: function() {
        api.createDatabase('mydb');
    },
    getStyles: function() {
        return {
            title: {
                fontSize: '20px',
                textAlign: 'center'
            }
        }
    },
    render: function() {
        var styles = this.getStyles();
        return (
            <div>
                <div style={styles.title}>
                    P2P Demo
                </div>
                <Form />
                <List />
            </div>
        )
    }
});

React.render(<App />, document.getElementById('root'));