import React, { useContext, useState, useEffect } from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

function TimeboxList() {
  const { accessToken } = useContext(AuthenticationContext);
  const [timeboxes, setTimeboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then(timeboxes => setTimeboxes(timeboxes))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  function addTimebox(timebox) {
    TimeboxesAPI.addTimebox(timebox, accessToken).then(addedTimebox =>
      setTimeboxes(prevTimeboxes => {
        return [...prevTimeboxes, addedTimebox];
      })
    );
  }

  function removeTimebox(indexToRemove) {
    TimeboxesAPI.removeTimebox(timeboxes[indexToRemove], accessToken).then(() =>
      setTimeboxes(prevTimeboxes => {
        const timeboxes = prevTimeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return timeboxes;
      })
    );
  }

  function updateTimebox(indexToUpdate, timeboxToUpdate) {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then(
      updatedTimebox =>
        setTimeboxes(prevTimeboxes => {
          const timeboxes = prevTimeboxes.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return timeboxes;
        })
    );
  }

  function handleCreate(createdTimebox) {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  }

  return (
    <>
      <TimeboxCreator onCreate={handleCreate} />
      {loading ? "Timeboxy się ładują..." : null}
      {error ? "Nie udało się załadować :(" : null}
      {timeboxes.map((timebox, index) => (
        <Timebox
          key={timebox.id}
          title={timebox.title}
          totalTimeInMinutes={timebox.totalTimeInMinutes}
          onDelete={() => removeTimebox(index)}
          onEdit={() =>
            updateTimebox(index, {
              ...timebox,
              title: "Updated timebox"
            })
          }
        />
      ))}
    </>
  );
}

export default TimeboxList;
