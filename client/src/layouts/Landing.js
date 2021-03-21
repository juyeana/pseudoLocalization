import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      inputStr: '',
      inputPrefix: '',
      inputSuffix: '',
      inputIdDigits: '',
      inputJson: null,
      alteredText: '',
      errors: '',
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onUpload(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
  }


  onSubmit(e) {
    // console.log(this.state.inputJson);
    e.preventDefault();

    const {
      inputStr,
      inputPrefix,
      inputSuffix,
      inputIdDigits,
      inputJson,
    } = this.state;

    let formData = new FormData();

    formData.append('inputStr', inputStr);
    formData.append('inputPrefix', inputPrefix);
    formData.append('inputSuffix', inputSuffix);
    formData.append('inputIdDigits', inputIdDigits);
    formData.append('inputJson', inputJson);
    axios
      .post('/api/v1/pseudo', formData)
      .then((res) => {
        this.setState({ alteredText: res.data });
        this.setState({ errors: '' });
      })
      .catch((err) => {
        this.setState({ alteredText: '' });
        if (err.response.status === 500) {
          this.setState({
            errors: 'Invalid file format! Only json file is supported',
          });
        } else {
          this.setState({ errors: err.response.data });
        }
      });
  }

  render() {
    const selectAllText = (e) => {
      e.target.select();
    };

    return (
      <div className='row'>
        <div className='main-section'>
          <div class='accordion' id='accordionExample'>
            <div class='accordion-item'>
              <h2 class='accordion-header' id='headingThree'>
                <button
                  class='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  <strong>How to use this tool</strong>
                </button>
              </h2>
              <div
                id='collapseThree'
                class='accordion-collapse collapse'
                aria-labelledby='headingThree'
                data-bs-parent='#accordionExample'
              >
                <div class='accordion-body'>
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{' '}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
          <div className='content-body'>
            <form
              onSubmit={this.onSubmit.bind(this)}
              encType='multipart/form-data'
              className='form'
            >
              <textarea
                className='u-margin-bottom-small'
                onChange={this.onChange.bind(this)}
                // autoFocus
                name='inputStr'
                placeholder='Enter your text'
              ></textarea>
              <br />
              <div className='option-body'>
                <label for='inputPrefix' class='input-label'>
                  Prefix{' '}
                </label>{' '}
                <input
                  onChange={this.onChange.bind(this)}
                  className='u-margin-top-small'
                  type='text'
                  id='inputPrefix'
                  name='inputPrefix'
                  placeholder='_[['
                />
                <label for='inputSuffix' class='input-label'>
                  Suffix{' '}
                </label>
                <input
                  onChange={this.onChange.bind(this)}
                  className='u-margin-top-small '
                  type='text'
                  id='inputSuffix'
                  name='inputSuffix'
                  placeholder=']]'
                />
                <br />
                <label for='inputIdDigits' class='input-label'>
                  # of digits of id{' '}
                </label>
                <input
                  onChange={this.onChange.bind(this)}
                  className='u-margin-top-small '
                  type='text'
                  id='inputIdDigits'
                  name='inputIdDigits'
                  placeholder='six-digit is default'
                />
                <label className='label-file' htmlFor='upload'>
                  [Optional] Upload your own pseudo character sets in .json
                </label>
                <input
                  className='btn-file'
                  onChange={this.onUpload.bind(this)}
                  type='file'
                  name='inputJson'
                />
              </div>

              {this.state.errors && (
                <div className='error'>{this.state.errors}</div>
              )}

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
                placeholder='997440_[[Ёดtεя Ўơůя tεχt]]'
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
