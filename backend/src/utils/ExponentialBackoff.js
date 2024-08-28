class ExponentialBackoff {
  async retry(fn, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i < retries - 1) {
          await this.delay(Math.pow(2, i) * 1000);
        } else {
          throw err;
        }
      }
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = ExponentialBackoff;
