import * as constants from '../constants';
const req = require('request-promise');

const create = async ctx => {
  const opt = {
    method: 'post',
    uri: constants.EXTERNAL_API,
    headers: {
      'Content-Type': 'application/json',
    },
    body: ctx.request.body,
    json: true,
  };

  await req(opt)
    .then(resp => {
      console.log(resp);
      ctx.status = 200;
      ctx.body = resp;
    })
    .catch(err => console.log(err));
}


export default create;
