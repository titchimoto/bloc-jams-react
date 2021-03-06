import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './styles/App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav className="navbar">
          <Link to="/"><img src="/assets/images/logo.png" alt="bloc jams logo" /></Link>
          <Link to="/library" id="library-link">LIBRARY</Link>
          </nav>
        </header>
        <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
        </main>

      </div>
    );
  }
}

export default App;
