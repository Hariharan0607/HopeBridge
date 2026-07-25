class PriorityQueue {

    constructor() {
        this.queue = [];
    }

    enqueue(trust) {

        this.queue.push(trust);

        this.queue.sort((a, b) => b.priorityScore - a.priorityScore);
    }

    dequeue() {

        return this.queue.shift();
    }

    getAll() {

        return this.queue;
    }

}

module.exports = PriorityQueue;