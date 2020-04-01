import dotenv from 'dotenv'

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    process.env = {
      ...process.env,
      ...dotenv.config().parsed,
    }
  }
}
