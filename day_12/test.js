const newNode = (val) => {
    return { val, next: null };
}

const insertTail = (head, node) => {
    if (head == null) return node;
    if (head.next == null) {
        head.next = node;
        return head;
    }

    insertTail(head.next, node);
    return head;
}

const printList = (head) => {
    if (head == null) {
        console.log('null');
        return;
    }

    process.stdout.write(`(${head.val}) -> `);
    printList(head.next);
}

const reverseList = (head) => {
    if (head == null) return null;
    if (head.next == null) return head;

    let newHead = reverseList(head.next);
    head.next = null;
    return insertTail(newHead, head);
}

// let head;

// for (let i = 1; i <= 5; i++)
//     head = insertTail(head, newNode(i));

// printList(reverseList(head));

const fact = (n) => {
    if (n <= 1) return 1;

    return n * fact(n - 1);

    // let total = 1;
    // for (let i = 2; i <= n; i++)
    //     total *= i;

    // return total;
}

console.log(fact(30))