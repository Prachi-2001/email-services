class RateLimiter {
  constructor(maxRequests, interval) {
    this.maxRequests = maxRequests;
    this.interval = interval;
    this.requests = [];
  }

  allow() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.interval
    );
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;
