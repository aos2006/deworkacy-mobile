const req = require('request-promise');

const create = (apiUrl) => async ctx => {
  console.log(ctx);
  const opt = {
    method: 'post',
    uri: `${process.env.EXTERNAL_API_HOST}/${apiUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      ...ctx.request.body,
    },
    json: true,
  };

  await req(opt)
    .then(resp => {
      ctx.status = 200;
      ctx.body = resp;
    })
    .catch(err => console.log(err));
}


export default create;
