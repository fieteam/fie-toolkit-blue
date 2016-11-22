'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'Blue';
import * as actions from '../../actions/page1';
import './index.scss';

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { dispatch, page1 } = this.props;
    dispatch(actions.addText(`文本${page1.list.length + 1}`));
  }
  render() {
    const { list } = this.props.page1;

    return (
      <div className="page1-page">
        <p>
          <Button onClick={this.handleClick}>添加文本</Button>
        </p>
        <p>
          { list.map((item, index) => {
            return <span className="result" key={index}>{item}</span>;
          })}
        </p>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    page1: state.page1
  };
})(Page1);
