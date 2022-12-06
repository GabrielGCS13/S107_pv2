export default interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string | object;
}
