import React from 'react';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "This is settings page"
        };
    }

    render() {
        return (
            <div>
                <h3>{this.state.message}</h3>
            </div>
        );
    }
}

export default Settings;