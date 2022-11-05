import { getConfig } from "blitz"
import AWS from "aws-sdk"

export const getAwsBucket = () => {
  const { publicRuntimeConfig } = getConfig()
  AWS.config.update({
    accessKeyId: publicRuntimeConfig.AWS_ACCESS_KEY,
    secretAccessKey: publicRuntimeConfig.AWS_SECRET_KEY,
  })
  return new AWS.S3({
    params: { Bucket: publicRuntimeConfig.AWS_BUCKET_NAME },
    region: publicRuntimeConfig.AWS_REGION,
    signatureVersion: "v2",
  })
}

export const getSignedUrl = (url) => {
  const { publicRuntimeConfig } = getConfig()
  const objKey = url.split("https://ats.s3.amazonaws.com/")[1]
  const myBucket = getAwsBucket()
  const singedUrl = myBucket.getSignedUrl("getObject", {
    Bucket: publicRuntimeConfig.AWS_BUCKET_NAME,
    Key: objKey,
  })
  return singedUrl
}
