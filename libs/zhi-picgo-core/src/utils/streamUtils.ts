import arrayBufferToBuffer from 'arraybuffer-to-buffer'

const readBuffer = (buf: any): Buffer => {
  let imageBuffer = buf
  if (imageBuffer instanceof ArrayBuffer) {
    imageBuffer = arrayBufferToBuffer(imageBuffer)
  }
  return imageBuffer
}

const streamUtils = {
  readBuffer
}

export default streamUtils
