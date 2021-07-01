import React, { useContext, useEffect, useState } from 'react';

const List = () => {
  const [clubs, setClubs] = useState([]);
  // TODO: define club interface and club post interface.

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // TODO: get all clubs
    }
    return () => {
      mounted = false;
    };
  }, []);

  const renderClubs = () => {
    // TODO: render clubs to ui
    return <div></div>;
  };

  return <div>{renderClubs()}</div>;
};

export default List;
