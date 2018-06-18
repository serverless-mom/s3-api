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
  let responseBody = 'default body';
  console.log (params);


  const s3Return = await s3.getObject(params, (error) =>{
    console.error(error.message);
  });
  console.log(s3Return);
  if(s3Return.Body){console.log(s3Return.Body);}


  let response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: responseBody
  };

  if (responseBody){
    return response;
  }else{
    return {};
  }
};
