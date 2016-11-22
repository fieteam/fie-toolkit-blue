'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Feedback } from 'Blue';
import * as actions from '../../actions/index';
import './index.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { dispatch, counter } = this.props;
    if (this.loading) {
      return false;
    }

    this.setState({
      loading: true
    });
    dispatch(actions.getList(counter + 1, () => {
      this.setState({
        loading: false
      });
    }, (json) => {
      this.setState({
        loading: false
      });
      Feedback.Toast.error({
        content: json.msg
      });
    }));
  }
  render() {
    const list = this.props.list;
    return (
      <div className="list-page">
        <p>
          <Button onClick={this.handleClick}>加载列表</Button>
          {this.state.loading ? <span className="loading-text">加载中...</span> : ''}  
        </p>
        <p>
          {list.map((item, index) => {
            return <span className="result" key={index}>{item}</span>;
          })}
        </p>
      </div>
    );
  }
}


// map state to props
export default connect((state) => {
  return state;
})(List);
