import {mount} from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// Using the mount and returning a component.
export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({pathname: nextPathname}) => {
        const {pathname} = history.location;
        pathname !== nextPathname && history.push(nextPathname);
      }
    });

    history.listen(onParentNavigate);
    // The empty array means run this effect only once,
    // first time the app loads.
  }, []);

  return <div ref={ref}/>;
};
