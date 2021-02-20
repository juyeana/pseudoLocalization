import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './layouts/Landing';
import Footer from './layouts/Footer';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Landing} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
