import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/AxiosTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

const Timebox = React.lazy(() => import("./Timebox"));

class TimeboxList extends React.Component {
  state = {
    timeboxes: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    TimeboxesAPI.getAllTimeboxes(this.context.accessToken)
      .then(timeboxes => {
        this.setState({ timeboxes });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  addTimebox = timebox => {
    TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
      addedTimebox =>
        this.setState(prevState => {
          const timeboxes = [...prevState.timeboxes, addedTimebox];
          return { timeboxes };
        })
    );
  };
  removeTimebox = indexToRemove => {
    TimeboxesAPI.removeTimebox(
      this.state.timeboxes[indexToRemove],
      this.context.accessToken
    ).then(() =>
      this.setState(prevState => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      })
    );
  };
  updateTimebox = (indexToUpdate, timeboxToUpdate) => {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.context.accessToken).then(
      updatedTimebox =>
        this.setState(prevState => {
          const timeboxes = prevState.timeboxes.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return { timeboxes };
        })
    );
  };

  handleCreate = createdTimebox => {
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };
  render() {
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {this.state.loading ? "Timeboxy się ładują..." : null}
        {this.state.error ? "Nie udało się załadować :(" : null}
        {this.state.timeboxes.map((timebox, index) => (
          <React.Suspense fallback={"... Loading"}>
            <Timebox
              key={timebox.id}
              title={timebox.title}
              totalTimeInMinutes={timebox.totalTimeInMinutes}
              onDelete={() => this.removeTimebox(index)}
              onEdit={() =>
                this.updateTimebox(index, {
                  ...timebox,
                  title: "Updated timebox"
                })
              }
            />
          </React.Suspense>
        ))}
      </>
    );
  }
}
TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;
