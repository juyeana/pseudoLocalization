import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div className='row'>
        <div className='main-section'>
          <div className='content-head'>
            <div className='heading-primary heading-primary--main'>
              <h1>Pseudo Localization Tool</h1>
              <h2 className='heading-primary heading-primary--second'>
                Pšεůđơ Լơ¢áլίžát̪ίơด ʈơơլ
              </h2>
            </div>
          </div>
          <div className='content-body'>
            <form>
              <textarea
                id='input-text'
                autofocus
                rows='10'
                cols='70'
                name='input-text'
                placeholder='Enter your text'
              ></textarea>
              <br />
              <input
                className='u-margin-top-small '
                type='checkbox'
                id='wrapperChecked'
                value='true'
                name='wrapperChecked'
              />
              <lable className='checkbox-label' for='wrapperChecked'>
                wrap pseudo characters with prepend & append
              </lable>
              <br />
              <input
                className='u-margin-top-small'
                type='checkbox'
                id='idChecked'
                value='true'
                name='idChecked'
              />
              <lable className='checkbox-label' for='idChecked'>
                add a hash id
              </lable>
              <div className='sendText u-margin-both-small'>
                <button type='submit'>
                  <i className='fas fa-angle-double-down arrow'></i>
                </button>
              </div>

              <textarea
                readonly
                id='altered-text'
                autofocus
                rows='10'
                cols='70'
                name='altered-text'
                placeholder='Ёดt̪εя Ўơůя t̪εχt̪'
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
