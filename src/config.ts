import dotenv from 'dotenv'

export default () => {
  if (process.env.NODE_ENV !== 'prodution') {
    dotenv.config()
  }
}
