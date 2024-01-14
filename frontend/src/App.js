import './App.css';
import MessagesContextProvider from './contexts/MessagesContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import Rotas from './router';

function App() {
  return (
    <div>
      <MessagesContextProvider>
        <UserContextProvider>
          <Rotas />
        </UserContextProvider>
      </MessagesContextProvider>
    </div>
  );
}

export default App;
