import { useState, useEffect } from 'react';
import { adaptRoot } from '../utils/adapters';

const useSanity = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const project = async () =>
      getFolders().then((projects) => {
        setData(adaptRoot(projects));
      });

    project();
  }, []);

  return data;
};

export default useSanity;
