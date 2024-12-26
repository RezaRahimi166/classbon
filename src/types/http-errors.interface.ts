interface Problem {
  title: string;
  statusCode: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

interface BadReaquestError extends Problem {}
interface UnauthorizedError extends Problem {}
interface ValidationError extends Problem {}
interface NotFoundError extends Problem {}
interface UnhandleError extends Problem {}
interface NetworkError extends Problem {}

export type {
  Problem,
  BadReaquestError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  UnhandleError,
  NetworkError,
};
