import './App.css';
import Header from './components/header/Header';
import MainBody from './components/mainBody/MainBody';
import Template from './components/mainBody/Template';
import FormHeader from './components/formHeader/FormHeader';
import FormTabs from './components/FormTabs';
import QuestionForm from'./components/QuestionForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/form/:id" element={
            <div>
              <FormHeader />
              <FormTabs />
              <QuestionForm />
            </div>
          } />
          <Route path="/" element={
            <>
              <Header />
              <Template />
              <MainBody />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
