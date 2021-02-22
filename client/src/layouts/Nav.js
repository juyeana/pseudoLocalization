import React from 'react';
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <div className='content-head'>
      <div className='heading-primary heading-primary--main'>
        <h1>Pseudo Localization Tool</h1>
        <h2 className='heading-primary heading-primary--second u-margin-top-small'>
          Pšεůđơ Լơ¢áլίžát̪ίơด ʈơơլ
        </h2>
        <Link to='/customization' className='customization u-align-right'>
          customize it <i class='fas fa-angle-double-right'></i>
        </Link>
      </div>
    </div>
  );
}
