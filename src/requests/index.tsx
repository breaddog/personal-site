import { ERC721Request } from './ERC721Request'
import { ERC1155Request } from './ERC1155Request'

const RequestMapping: {
  [key: string]: any
} = {
  ERC721Request,
  ERC1155Request,
}

const instances: {
  [key: string]: any
} = {}

export class RequestFactory {
  static getRequest(requestType: string, args?: any) {
    const unique = args?.unique ?? false

    const RequestClass = RequestMapping[requestType]
    if (!RequestClass) {
      console.error(`invalid request made: ${requestType}`)
    }
    // if unique return instance as is
    if (unique) return new RequestClass({ ...args })
    let requestInstance = instances[requestType]
    if (!requestInstance) {
      requestInstance = new RequestClass({ ...args })
      instances[requestType] = requestInstance
    }
    return requestInstance
  }
}
