import React from 'react';

export default class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.newTitle = React.createRef();
        this.newMinutes = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();

        const title = this.newTitle.current.value;
        const totalTimeInMinutes = this.newMinutes.current.value;
        const timebox = { title, totalTimeInMinutes };

        this.props.onCreate(timebox)

        this.newTitle.current.value = ""
        this.newMinutes.current.value = ""
    }

    render() {
        return (
            <form className="TimeboxCreator" onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Co robisz?
                    <input
                        ref={this.newTitle}
                        type="text"
                    />
                </label>
                <br />
                <label>
                    Ile minut?
                    <input
                        ref={this.newMinutes}
                        type="number" />
                </label>
                <br />
                <button>
                    Dodaj timebox
                </button>
            </form>
        )
    }
}