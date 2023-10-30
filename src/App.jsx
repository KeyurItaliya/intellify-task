import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import UserDataForm from "./components/UserDataForm";
import { store, persistor } from "./store/configerStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserDataForm />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
