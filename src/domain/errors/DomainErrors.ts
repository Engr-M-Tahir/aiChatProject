export class DomainError extends Error {
  status = 400;
  code = "DOMAIN_ERROR";
}

export class QuotaExceededError extends DomainError {
  status = 402;
  code = "QUOTA_EXHAUSTED";
}