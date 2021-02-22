import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      inputStr: '',
      inputPrepend: '',
      inputAppend: '',
      id_digits: '',
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
      inputPrepend,
      inputAppend,
      id_digits,
      inputJson,
    } = this.state;

    let formData = new FormData();

    formData.append('inputStr', inputStr);
    formData.append('inputPrepend', inputPrepend);
    formData.append('inputAppend', inputAppend);
    formData.append('id_digits', id_digits);
    formData.append('inputJson', inputJson);

    axios
      .post('/api/v1/pseudo/customize', formData)
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
        }else{
          this.setState({errors:err.response.data})
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
          <div className='content-head'>
            <div className='heading-primary heading-primary--main'>
              <h1>Pseudo Localization Tool</h1>
              <h2 className='heading-primary heading-primary--second u-margin-top-small'>
                Pšεůđơ Լơ¢áլίžát̪ίơด ʈơơլ
              </h2>
              <Link to='/' className='customization u-align-right'>
                home <i className='fas fa-angle-double-right'></i>
              </Link>
            </div>
          </div>
          <div className='content-body-customization'>
            <form
              onSubmit={this.onSubmit.bind(this)}
              encType='multipart/form-data'
              className='form'
            >
              <textarea
                className='u-margin-bottom-small'
                onChange={this.onChange.bind(this)}
                autoFocus
                name='inputStr'
                placeholder='Enter your text'
              ></textarea>
              <br />
              <label className='label-file' htmlFor='upload'>
                Character sets in json format{' '}
              </label>
              <input
                onChange={this.onUpload.bind(this)}
                type='file'
                name='inputJson'
              />
              <br />
              {this.state.errors && (
                <div className='error'>{this.state.errors}</div>
              )}
              <input
                onChange={this.onChange.bind(this)}
                className='u-margin-top-small '
                type='text'
                id='inputPrepend'
                name='inputPrepend'
                placeholder='Prepend'
              />{' '}
              <input
                onChange={this.onChange.bind(this)}
                className='u-margin-top-small '
                type='text'
                id='inputAppend'
                name='inputAppend'
                placeholder='Append'
              />{' '}
              <input
                onChange={this.onChange.bind(this)}
                className='u-margin-top-small '
                type='text'
                id='id_digits'
                name='id_digits'
                placeholder='# of digits of hash id'
              />
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
