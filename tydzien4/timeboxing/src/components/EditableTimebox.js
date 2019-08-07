import React from 'react';

import CurrentTimebox from './CurrentTimebox';
import TimeboxEditor from './TimeboxEditor';

export default class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się o kontrolowanych komponentach",
        totalTimeInMinutes: 15,
        isEditable: true
    }

    onTitleChange(e) {
        this.setState({title: e.target.value})
    }

    onTotalTimeInMinutesChange(e) {
        this.setState({totalTimeInMinutes: e.target.value})
    }

    handleConfirm() {
        this.setState({isEditable: false})
    }

    handleEdit() {
        this.setState({isEditable: true})
    }

    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>
                <React.StrictMode>
                    <TimeboxEditor
                        title={title}
                        totalTimeInMinutes={totalTimeInMinutes}
                        onTitleChange={this.onTitleChange.bind(this)}
                        onTotalTimeInMinutesChange={this.onTotalTimeInMinutesChange.bind(this)}
                        isEditable={isEditable}
                        onConfirm={this.handleConfirm.bind(this)}
                    />
                    <CurrentTimebox
                        totalTimeInMinutes={totalTimeInMinutes}
                        goal={title}
                        key={totalTimeInMinutes}
                        isEditable={isEditable}
                        onEdit={this.handleEdit.bind(this)}
                    />
                </React.StrictMode>
            </>
        )
    }
}
