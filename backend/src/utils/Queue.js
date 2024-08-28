class Queue {
  constructor() {
    this.queue = new Set();
  }

  has(key) {
    return this.queue.has(key);
  }

  add(key) {
    this.queue.add(key);
  }

  remove(key) {
    this.queue.delete(key);
  }
}

module.exports = Queue;
