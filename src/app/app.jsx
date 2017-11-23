require('./app.scss');
import 'react-tippy/dist/tippy.css';

import React from 'react';
import Clipboard from 'clipboard';
import { Tooltip } from 'react-tippy';
import { setTimeout } from 'timers';

import StateStore from './config/state-store';

export default class App extends React.Component {
  constructor(p) {
    super();
    this.state = StateStore;
  }

  autoFocusTextarea() {
    document.getElementById('j-textarea').focus();
  }

  componentDidMount() {
    const self = this;

    this.setState({
      contentFieldStyle: {
        width: '400px'
      }
    });

    setTimeout(() => {
      self.setState({
        displayFlag: true
      });

      self.autoFocusTextarea();
    }, 100);

    this.clipboard = new Clipboard(".j-clipboard-btn", {
      text: () => {
        return self.state.content;
      },
    });

    this.clipboard.on("success", (e) => {
      self.setState({
        showTooltip: true
      });

      setTimeout(() => {
        self.setState({
          showTooltip: false
        });
      }, self.state.delay);
    });

    this.clipboard.on("error", () => {
      console.log("拷贝失败");
    });
  }

  componentDidUpdate() {
    //
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  cleanContent() {
    this.setState({
      content: ''
    });

    this.autoFocusTextarea();
  }

  traditional2simplified() {
    this.mainConverterEvt();
  }

  simplified2traditional() {
    this.mainConverterEvt(1);
  }

  mainConverterEvt(type = 0) {
    let _con = '';

    _con = this.strArrForEachEvt(type);

    this.setState({
      content: _con
    });
  }

  strArrForEachEvt(type = 0) {
    const state = this.state;
    const content = state.content;
    if(!state.content) {
      return;
    }

    let strCache = '';
    let _arr = (state.content + '').split('');

    const baseKey = type === 0 ? 'sourceTraditional' : 'sourceSimplified';
    const forEachKey = type === 0 ? 'sourceSimplified' : 'sourceTraditional';

    _arr && _arr.forEach((item, index) => {
      let _i = state[baseKey].indexOf(content.charAt(index));
      strCache += (_i != -1) ? state[forEachKey].charAt(_i) : content.charAt(index);
    });

    return strCache;
  }

  render() {
    return (
      <div className='app-warp' style={this.state.contentFieldStyle}>
        <div className='content-field'>
          {
            this.state.displayFlag ?
            <textarea
            id='j-textarea'
            className='content-field-textarea j-content-field-textarea'
            placeholder='请输入'
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)} />
            :
            null
          }
          <div className='content-field-button'>
            <button
              disabled={this.state.content == ''}
              onClick={this.simplified2traditional.bind(this)}>
              简→繁
            </button>

            <button
              disabled={this.state.content == ''}
              onClick={this.traditional2simplified.bind(this)}>
              繁→简
            </button>

            <button
              disabled={this.state.content == ''}
              onClick={this.cleanContent.bind(this)}>
              清空
            </button>

            <button
              className='j-clipboard-btn'
              disabled={this.state.content == ''}>
              复制
            </button>

            <Tooltip
              title='复制成功'
              theme='dark'
              position='right'
              size='small'
              className='reset-tippy-popper'
              arrow={this.state.arrow}
              interactive
              open={this.state.showTooltip}>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}