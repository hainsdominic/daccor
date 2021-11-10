import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import drizzleOptions from './drizzleOptions';
import Navbar from './components/Navbar';
import NewLease from './components/NewLease';
import PayLease from './components/PayLease';

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return 'Loading...';
          }

          return (
            <Router>
              <Navbar drizzleState={drizzleState} />
              <Routes>
                <Route exact path="/" element={<NewLease drizzle={drizzle} drizzleState={drizzleState} />} />
                <Route exact path="/pay" element={<PayLease drizzle={drizzle} drizzleState={drizzleState} />} />
              </Routes>
            </Router>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default App;
