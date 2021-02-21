import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      inputStr: '',
      wrapperChecked: null,
      idChecked: null,
      alteredText: '',
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.checked) this.setState({ [e.target.id]: e.target.checked });
    else this.setState({ [e.target.id]: null });
  }

  onSubmit(e) {
    e.preventDefault();
    const text = {
      inputStr: this.state.inputStr,
      wrapperChecked: this.state.wrapperChecked,
      idChecked: this.state.idChecked,
    };

    axios
      .post('/api/v1/pseudo', text)
      .then((res) => {
        this.setState({ alteredText: res.data });
      })
      .catch((err) => {
        this.setState({ alteredText: '' });
      });
  }

  render() {
    const selectAllText = (e) => {
      e.target.select();
    };
    return (
      <div className='row'>
        <div className='main-section'>
          <div className='content-head'>
            <div className='heading-primary heading-primary--main'>
              <h1>Pseudo Localization Tool</h1>
              <h2 className='heading-primary heading-primary--second u-margin-top-small'>
                Pšεůđơ Լơ¢áլίžát̪ίơด ʈơơլ
              </h2>
            </div>
          </div>
          <div className='content-body'>
            <form onSubmit={this.onSubmit.bind(this)} className='form'>
              <textarea
                onChange={this.onChange.bind(this)}
                // id='inputStr'
                autoFocus
                name='inputStr'
                placeholder='Enter your text'
              ></textarea>
              <br />
              <input
                onChange={this.onChange.bind(this)}
                className='u-margin-top-small '
                type='checkbox'
                id='wrapperChecked'
              />
              <label className='checkbox-label' htmlFor='wrapperChecked'>
                wrap pseudo characters with prepend & append
              </label>
              <br />
              <input
                type='text'
                name='prepend'
                class='prepend'
                placeholder='prepend'
              ></input>
              <br />
              <input
                type='text'
                name='append'
                class='append'
                placeholder='append'
              ></input>
              <br />
              <input
                onChange={this.onChange.bind(this)}
                className='u-margin-top-small'
                type='checkbox'
                id='idChecked'
              />
              <label className='checkbox-label' htmlFor='idChecked'>
                add hash id
              </label>
              <div className='sendText u-margin-both-small'>
                <button type='submit'>
                  <i className='fas fa-angle-double-down arrow'></i>
                </button>
              </div>

              <textarea
                onClick={selectAllText}
                readOnly
                name='alteredText'
                defaultValue={this.state.alteredText}
                placeholder='Ёดtεя Ўơůя tεχt'
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
