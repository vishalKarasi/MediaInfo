import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Tab({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const activeContent = tabs.find((tab) => tab.label == activeTab)?.content;
  return (
    <>
      <div className="tabs">
        {tabs.map((link) => {
          <NavLink link={link} />;
        })}
      </div>
      {activeContent && (
        <section className={`${activeTab}`}>{activeContent}</section>
      )}
    </>
  );
}

export default Tab;
