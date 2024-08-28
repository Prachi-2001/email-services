class CircuitBreaker {
  constructor(failureThreshold = 5, resetTimeout = 30000) {
    this.failureThreshold = failureThreshold;
    this.resetTimeout = resetTimeout;
    this.failures = 0;
    this.lastFailureTime = null;
    this.state = "CLOSED";
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (now - this.lastFailureTime > this.resetTimeout) {
        this.state = "HALF-OPEN";
      } else {
        throw new Error("Circuit breaker is OPEN");
      }
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (err) {
      this.fail();
      throw err;
    }
  }

  reset() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  fail() {
    this.failures += 1;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }
}

module.exports = CircuitBreaker;
