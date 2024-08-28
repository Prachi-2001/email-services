class MockEmailProvider {
  constructor(name) {
    this.name = name;
  }

  async send(email) {
    if (Math.random() > 0.7) {
      throw new Error(`Failed to send email via ${this.name}`);
    }
    return true;
  }
}

module.exports = MockEmailProvider;
