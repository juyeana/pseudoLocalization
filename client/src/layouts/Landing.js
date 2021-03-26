import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      inputStr: '',
      inputPrefix: '',
      inputSuffix: '',
      inputIdDigits: '',
      inputJson: null,
      pseudoText: '',
      errors: {},
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onUpload(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  onSubmit(e) {
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
      .post('/api/v2/pseudo', formData)
      .then((res) => {
        this.setState({ pseudoText: res.data });
        this.setState({ errors: {} });
      })
      .catch((err) => {
        this.setState({ pseudoText: '' });
        if (err.response.status === 500) {
          this.setState({
            errors: {
              ...err.response.data,
              inputJson: 'Invalid file format! Only json file is supported',
            },
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

    const { errors } = this.state;
    return (
      <div className='row'>
        <div className='main-section'>
          <div className='accordion' id='accordionExample'>
            <div className='accordion-item'>
              <h2 className='accordion-header' id='headingThree'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  <strong>Readme</strong>
                </button>
              </h2>
              <div
                id='collapseThree'
                className='accordion-collapse collapse'
                aria-labelledby='headingThree'
                data-bs-parent='#accordionExample'
              >
                <div className='accordion-body'>
                  <h4 className='instruction-header'>
                    To convert strings to Pseudo-localized strings
                  </h4>

                  <ul>
                    <li>
                      <strong>API Config</strong>
                      <ul className='list-sub'>
                        <li>URL : https://pseudo-localization.herokuapp.com</li>

                        <li>URI : /api/v2/pseudo</li>
                        <li>method : POST</li>
                      </ul>
                      <pre>
                        <code className='inline-code'>
                          {`{"inputStr":"I want this text to be localized",

"inputPrefix":"_[[",

"inputSuffix":"]]",

"inputIdDigits":6
}`}
                        </code>
                      </pre>
                    </li>
                    <li>
                      <strong>About string id (# of digits of id)</strong>:
                      <br />
                      [note] sha256 hash is used for string id. Due to the
                      conversion from hex to integer and then using modulus to
                      make the desired id, some collisions are possible.
                      <ul>
                        <li>
                          text box
                          <br />
                          - empty : 6 digits as default
                          <br />- zero: no id showing
                        </li>
                      </ul>
                    </li>
                  </ul>
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
                className={classnames('u-margin-bottom-small', {
                  'is-invalid': errors.inputStr,
                })}
                onChange={this.onChange.bind(this)}
                // autoFocus
                name='inputStr'
                placeholder='Enter your text'
              ></textarea>
              {errors.inputStr && (
                <div className='invalid-feedback'>{errors.inputStr}</div>
              )}
              <br />
              <div className='option-body'>
                <label htmlFor='inputPrefix' className='input-label'>
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
                <label htmlFor='inputSuffix' className='input-label'>
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
                <label
                  htmlFor='inputIdDigits'
                  className={classnames('input-label', {
                    'is-invalid': errors.inputIdDigits,
                  })}
                >
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
                {errors.inputIdDigits && (
                  <div className='invalid-feedback'>{errors.inputIdDigits}</div>
                )}
                <label
                  className={classnames('label-file', {
                    'is-invalid': errors.inputJson,
                  })}
                  htmlFor='upload'
                >
                  [Optional] Upload your pseudo character sets in .json format
                </label>
                <input
                  className='btn-file'
                  onChange={this.onUpload.bind(this)}
                  type='file'
                  name='inputJson'
                />
                {errors.inputJson && (
                  <div className='invalid-feedback'>{errors.inputJson}</div>
                )}
              </div>

              <div className='sendText u-margin-both-small'>
                <button type='submit'>
                  <i className='fas fa-angle-double-down arrow'></i>
                </button>
              </div>
              <textarea
                onClick={selectAllText}
                readOnly
                name='pseudoText'
                defaultValue={this.state.pseudoText}
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
