import axios from 'axios';

const baseUrl = 'https://hau5vcdi9a.execute-api.us-east-2.amazonaws.com/prod/api';

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
