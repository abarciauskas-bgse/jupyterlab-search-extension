import { Widget } from '@lumino/widgets';
import { PageConfig } from '@jupyterlab/coreutils'

import {
  request, RequestResult
} from './request';

let unique = 0;

//
// Widget to display Earth Data Search Client inside an iframe
//
export
class IFrameWidget extends Widget {

  constructor(path: string) {
    super();
    this.id = path + '-' + unique;
    unique += 1;

    this.title.label = "Earthdata Search";
    this.title.closable = true;

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    let iframe = document.createElement('iframe');
    iframe.id = "iframeid";

    // set proxy to EDSC
    request('get', path).then((res: RequestResult) => {
      if (res.ok){
        console.log('site accesible: proceeding');
        iframe.src = path;
      } else {
        iframe.setAttribute('baseURI', PageConfig.getBaseUrl());

        console.log('site failed with code ' + res.status.toString());
        if(res.status == 404){

        } else if(res.status == 401){

        } else {
          console.log('setting proxy');
          path = "edsc/proxy/" + path;
          iframe.src = path;
        }
      }
    });

    div.appendChild(iframe);
    this.node.appendChild(div);
  }
};