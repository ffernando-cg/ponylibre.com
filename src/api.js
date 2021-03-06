import axios from 'axios';

const baseUrl = 'https://1uiji913fc.execute-api.us-east-2.amazonaws.com/prod/api';

export default (
  method,
  path,
  data,
  params = {},
  headers = {}
) => axios({
  method,
  url: `${baseUrl}${path}`,
  data,
  params,
  headers
});
