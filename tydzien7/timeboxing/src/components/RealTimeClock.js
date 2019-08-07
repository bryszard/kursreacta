import React from 'react';

import Clock from './Clock';

export default class RealTimeClock extends React.Component {
    state = {
        timeInMiliseconds: null
    }

    currentTime = () => {
        const timestamp = Date.now();
        const milisecondsToday = timestamp % 86400000;

        return milisecondsToday;
    }

    componentDidMount() {
        this.startClock();
    }

    componentWillUnmount() {
        this.stopClock();
    }

    updateTime() {
        this.setState({timeInMiliseconds: this.currentTime()});
    }

    startClock() {
        this.intervalId = window.setInterval(() => {
            this.updateTime();
        }, 100);
    }

    stopClock() {
        window.clearInterval(this.intervalId);
    }

    render() {
        return (
            <>
                <Clock remainingTime={this.state.timeInMiliseconds} text="UTC " />
            </>
        )
    }
}
