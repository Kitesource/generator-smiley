/*
HTTP Status Code
https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status
*/
export const ERROR_STATUS: { [key: string | number]: string } = {
  /** 4xx: client error */
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  422: 'UNPROCESSABLE_ENTITY',

  /** 5xx: server error */
  500: 'INTERNAL_SERVER_ERROR',
  501: 'NOT_IMPLEMENTED',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT'
}
