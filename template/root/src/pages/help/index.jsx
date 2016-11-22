'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Button } from 'Blue';
import './index.scss';

class Help extends React.Component {
  render() {
    return (
      <div className="help-page">
        <div className="tip-text">
          <span>在这里开发您的客户运营平台页面</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Help />, document.getElementById('container'));

