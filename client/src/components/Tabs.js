import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTab = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    return () => {
      setActiveTab(children[0].props.label);
    };
  }, [children]);

  return (
    <div className='tabs'>
      <ul className='tab-list'>
        {children.map(child => {
          const label = child.props.label;
          return (
            <li
              key={label}
              className={
                label === activeTab
                  ? 'tab-list-item tab-list-active'
                  : 'tab-list-item'
              }
              onClick={e => onClickTab(e, label)}
            >
              {label}
            </li>
          );
        })}
      </ul>
      <div className='tab-content'>
        {children.map(tabContent => {
          return (
            <div
              key={tabContent.props.label}
              className={
                tabContent.props.label === activeTab
                  ? 'content-active'
                  : 'content-hide'
              }
            >
              {tabContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Tabs.propType = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
