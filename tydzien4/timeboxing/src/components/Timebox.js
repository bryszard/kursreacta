import React from 'react';
import PropTypes from 'prop-types';

export default class Timebox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.title,
            totalTimeInMinutes: props.totalTimeInMinutes,
            editable: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.confirmEdited = this.confirmEdited.bind(this)
    }

    toggleEdit() {
        this.setState(prevState => {
            return { editable: !prevState.editable }
        })
    }

    confirmEdited() {
        const { title, totalTimeInMinutes } = this.state;

        this.props.onUpdate({...this, title, totalTimeInMinutes})
        this.toggleEdit()
    }

    render() {
        const { onDelete } = this.props;
        const { editable, title, totalTimeInMinutes } = this.state;

        if (totalTimeInMinutes <= 0) {
            throw new Error('Czas musi być większy od zera!');
        }

        return (
            <div className="Timebox">
                <h3>{title} - {totalTimeInMinutes} min.</h3>
                <button onClick={onDelete}>Usuń</button>
                <button
                    disabled={editable}
                    onClick={this.toggleEdit}
                >
                    Zmień
                </button>
                <div className={ `InlineEditor ${editable ? '' : 'invisible'}` }>
                    <label>
                        Co?
                        <input
                            className="Input--inline"
                            type="text"
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </label>
                    <label>
                        Ile?
                        <input
                            className="Input--inline"
                            type="number"
                            onChange={(e) => this.setState({totalTimeInMinutes: e.target.value})}
                        />
                    </label>
                    <button
                        onClick={this.confirmEdited}
                    >
                        Zatwierdź
                    </button>
                </div>
            </div>
        )
    }
}

const commonHint = 'Please, pass to the component function that will define behaviour for this case';

Timebox.defaultProps = {
  onDelete: function() {
    console.log(`Handler onDelete triggered. ${commonHint}`);
  },
  onUpdate: function() {
    console.log(`Handler onUpdate triggered. ${commonHint}`);
  }
}

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Timebox.propTypes = {
  index: NumberOrStringType.isRequired,
  title: PropTypes.string.isRequired,
  totalTimeInMinutes: NumberOrStringType.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}
