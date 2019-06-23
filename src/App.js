import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

class App extends Component {
  render(){
  return (
    <div id="root">
      <div className="main">

      <Header></Header>
      <Timeline></Timeline>

      </div>
    </div>
  );
}
}

export default App;