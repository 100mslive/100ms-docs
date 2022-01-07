/* eslint-disable global-require */
import React from 'react'

import rtmp from '../public/postman/100ms-rtmp.postman_collection.json'
import hls from '../public/postman/100ms-hls.postman_collection.json'

const collections = {
  rtmp,
  hls,
}

interface Props {
  type: keyof typeof collections;
}

const DownloadCollection = ({ type }: Props) => {
  const data  = collections[type]
  const download =() => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8',
    });
  element.href = URL.createObjectURL(file);
  element.download = `100ms-${type}.json`;
  document.body.appendChild(element);
  element.click();
  }

  return (
    <button type='button' onClick={download} className='download-btn'>
      Download Collection
    </button>
  )
}

export default DownloadCollection
