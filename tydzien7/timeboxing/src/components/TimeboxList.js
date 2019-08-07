import React from 'react';
import uuidv4 from 'uuid/v4';

import TimeboxCreator from './TimeboxCreator';
import Timebox from './Timebox';
import ErrorBoundary from './ErrorBoundary';
import ErrorMessage from './ErrorMessage';

export default class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { title: "Uczę się 1", totalTimeInMinutes: "25" },
            { title: "Uczę się 2", totalTimeInMinutes: "4" },
            { title: "Uczę się 3", totalTimeInMinutes: "120" },
        ],
        hasError: false,
        errorMessage: ''
    }

    // shouldComponentUpdate(_nextProps, nextState) {
    //     return nextState.timeboxes.length !== this.state.timeboxes.length;
    // }

    modifyTimeboxes(indexToModify, numOfItemsToModify, newOrUpdatedTimebox) {
        this.setState(prevState => {
            const timeboxes = [...prevState.timeboxes];
            timeboxes.splice(...arguments);
            return { timeboxes };
        })

    }

    handleCreate(newTimebox) {
        try {
            if (newTimebox.totalTimeInMinutes <= 0) {
                throw new Error("Czas musi być większy od zera!");
            }

            this.modifyTimeboxes(0, 0, newTimebox)
        } catch(error) {
            console.error(error);
            this.setState({
                hasError: true,
                errorMessage: 'Nie mogę dodać timeboxa. Spróbuj później.'
            })
        }
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate.bind(this)} />
                <ErrorBoundary message="Coś poszło nie tak...">
                    <ErrorMessage
                        hasError={this.state.hasError}
                        message={this.state.errorMessage}
                        children={<div></div>}
                    />
                    {this.state.timeboxes.map((timebox, index) => {
                        const key = uuidv4();

                        return (
                            <Timebox
                                key={key}
                                index={key}
                                title={timebox.title}
                                totalTimeInMinutes={timebox.totalTimeInMinutes}
                                onDelete={() => this.modifyTimeboxes(index, 1)}
                                onUpdate={(updatedTimebox) => this.modifyTimeboxes(index, 1, updatedTimebox)}
                            />
                        )
                    })}
                </ErrorBoundary>
            </>
        )
    }
}
