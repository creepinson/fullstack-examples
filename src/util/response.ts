import { Response } from 'express'

export enum Status {
  SUCCESS,
  CREATED,
  BAD_REQUEST,
  SERVER_ERROR,
  UNAUTHORIZED,
}

export class MessageResponse {
  message: string
  status: Status
  extra: any[]
  constructor(message: string, status: Status) {
    this.message = message
    this.status = status
  }

  toJson(): any {
    return {
      status: Object.keys(Status)
        .find(key => Status[key] === this.status)!
        .toLowerCase(),
      message: this.message,
    }
  }

  toString() {
    return JSON.stringify(this.toJson())
  }

  send(res: Response, extra = {}) {
    res
      .status(
        this.status == Status.SUCCESS
          ? 200
          : this.status == Status.CREATED
          ? 201
          : this.status == Status.SERVER_ERROR
          ? 500
          : 400
      )
      .json({ ...this.toJson(), ...extra })
  }
}

export class ErrorResponse extends MessageResponse {
  constructor(message: string, status: Status) {
    super(message, status)
  }
}

export class SuccessResponse extends MessageResponse {
  constructor(message: string) {
    super(message, Status.SUCCESS)
  }
}

export class RenderResponse extends MessageResponse {
  constructor(message: string) {
    super(message, Status.SUCCESS)
  }

  send(res: Response, extra = {}) {
    res.status(200).render(this.message, extra)
  }
}

export class Responses {
  static DUPLICATE_USER: ErrorResponse = new ErrorResponse(
    'A user already exists with this username.',
    Status.BAD_REQUEST
  )
  static DUPLICATE_PRODUCT: ErrorResponse = new ErrorResponse(
    'A product already exists with this id.',
    Status.BAD_REQUEST
  )
}
