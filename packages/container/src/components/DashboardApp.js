import {mount} from 'dashboard/DashboardApp';
import React, {useRef, useEffect} from 'react';

// Using the mount and returning a component.
export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);

  }, []);

  return <div ref={ref}/>;
};
