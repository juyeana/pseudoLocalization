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
      alteredText: '',
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
      .post('/api/v1/pseudo', formData)
      .then((res) => {
        this.setState({ alteredText: res.data });
        this.setState({ errors: {} });
      })
      .catch((err) => {
        this.setState({ alteredText: '' });
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
    console.log(errors);
    return (
      <div className='row'>
        <div className='main-section'>
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
                  [Optional] Upload your own pseudo character sets in .json
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
