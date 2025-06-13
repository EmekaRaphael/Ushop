import React from 'react';
import ReactDOM from 'react-dom/client'; // updated import for React 18+
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import { store, persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';

// ReactDOM.render(
//   <Provider store={store} >
//     <PersistGate loading="null" persistor={persistor} >
//       <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );
