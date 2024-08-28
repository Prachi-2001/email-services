const ExponentialBackoff = require("../utils/ExponentialBackoff");
const RateLimiter = require("../utils/RateLimiter");
const CircuitBreaker = require("../utils/CircuitBreaker");
const Logger = require("../utils/Logger");
const Queue = require("../utils/Queue");
const MockEmailProvider = require("./MockEmailProvider");

class EmailService {
  constructor() {
    this.providers = [
      new MockEmailProvider("Provider1"),
      new MockEmailProvider("Provider2"),
    ];
    this.backoff = new ExponentialBackoff();
    this.rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute
    this.circuitBreaker = new CircuitBreaker();
    this.logger = new Logger();
    this.queue = new Queue();
  }

  async sendEmail(email) {
    if (!this.rateLimiter.allow()) {
      this.logger.log("Rate limit exceeded");
      return { status: "error", message: "Rate limit exceeded" };
    }

    const idempotencyKey = `${email.to}-${email.subject}-${email.body}`;
    if (this.queue.has(idempotencyKey)) {
      this.logger.log("Duplicate email attempt detected");
      return { status: "duplicate", message: "Email already sent" };
    }

    this.queue.add(idempotencyKey);

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        await this.circuitBreaker.execute(async () => {
          await this.backoff.retry(async () => {
            await provider.send(email);
          });
        });
        this.logger.log(`Email sent successfully via ${provider.name}`);
        return {
          status: "success",
          provider: provider.name,
          message: `Email sent successfully via ${provider.name}`,
        };
      } catch (err) {
        this.logger.log(`Failed with ${provider.name}, error: ${err.message}`);
        if (i === this.providers.length - 1) {
          this.queue.remove(idempotencyKey);
          return { status: "error", message: "All providers failed" };
        }
      }
    }
  }
}

module.exports = EmailService;
