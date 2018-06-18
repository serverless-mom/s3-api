const AWS = require('aws-sdk');
const s3 = new AWS.S3();


module.exports = async request => {
  const ports = JSON.parse(process.env.STACKERY_PORTS);

  // Log the request to the console.
  console.dir(request);

  // Get the message sent in the endpoint path parameter
  let fileId = request.pathParameters.fileId;


  let params = {
    Key: `${fileId}.txt`,
    Bucket: ports[0][0].bucket
  };
  let responseBody = '';

  try {
    let s3Return = await s3.getObject(params);
    responseBody = s3Return.data;
    console.dir({
      status: 'success',
      return: responseBody
    });
  } catch (error) {
    console.error(error.message);
  }

  let response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: responseBody
  };

  return response;
};
