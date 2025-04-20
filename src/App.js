import './App.css';
import Header from "./components/header/Header"
import MainBody from './components/mainBody/MainBody';
import Template from './components/mainBody/Template';
function App() {
  return (
    <div className="App">
      <Header />
      <Template/>
      <MainBody/>
    </div>
  );
}

export default App;
