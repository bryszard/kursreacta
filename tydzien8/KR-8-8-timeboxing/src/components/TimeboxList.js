import React, { useState, useEffect, useContext } from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

const TimeboxList = () => {
  const [timeboxes, setTimeboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { accessToken } = useContext(AuthenticationContext);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then(timeboxes => setTimeboxes(timeboxes))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const addTimebox = timebox => {
    TimeboxesAPI.addTimebox(timebox, accessToken).then(addedTimebox =>
      setTimeboxes(prevTimeboxes => {
        const timeboxes = [...prevTimeboxes, addedTimebox];
        return timeboxes;
      })
    );
  };

  const removeTimebox = indexToRemove => {
    TimeboxesAPI.removeTimebox(timeboxes[indexToRemove], accessToken).then(() =>
      setTimeboxes(prevTimeboxes => {
        const timeboxes = prevTimeboxes.filter(
          (_timebox, index) => index !== indexToRemove
        );
        return timeboxes;
      })
    );
  };

  const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then(
      updatedTimebox =>
        setTimeboxes(prevTimeboxes => {
          const timeboxes = prevTimeboxes.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return timeboxes;
        })
    );
  };

  const handleCreate = createdTimebox => {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };

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
            updateTimebox(index, { ...timebox, title: "Updated timebox" })
          }
        />
      ))}
    </>
  );
};

export default TimeboxList;
