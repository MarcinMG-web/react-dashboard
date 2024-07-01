export type ErrorCode = 400 | 403 | 404 | 500;

export interface ErrorPageProps {
  errorCode?: ErrorCode;
}
