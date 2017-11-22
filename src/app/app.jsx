require('./app.scss');

import React from 'react';

export default class App extends React.Component {
  constructor(p) {
    super();
    this.state = {
      title: "繁简转换"
    };
  }

  render() {
    return (
      <div>
        <div className='app-warp'>
          <span>{this.state.title}</span>
        </div>
      </div>
    )
  }
}