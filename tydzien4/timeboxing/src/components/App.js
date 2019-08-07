import React from 'react';

import EditableTimebox from './EditableTimebox';
import TimeboxList from './TimeboxList';
import ErrorBoundary from './ErrorBoundary';
// import RealTimeClock from './RealTimeClock';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ErrorBoundary message="Coś nie działa w całej aplikacji.">
                  {/* <RealTimeClock /> */}
                  <TimeboxList />
                  <EditableTimebox />
                </ErrorBoundary>
            </div>
        );
    }
}
