export const MockData = {
    streakData: {
        streak: 1
    },
    courseContent: {
        modules: [
            {
                id: 'module_0',
                title: 'Fundamentals',
                topics: [
                    {
                        id: 'course-intro',
                        title: 'Course Introduction',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet. Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 4,
                        difficulty: 'Beginner',
                        necesssity: 'Must learn'
                    },
                    {
                        id: 'bigo-notation',
                        title: 'Big O Notation',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Intermediate',
                        necesssity: 'Must learn'
                    },
                    {
                        id: 'complexity',
                        title: 'Complexity',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Advanced',
                        necesssity: 'Must learn'
                    },
                    {
                        id: 'complexity-2',
                        title: 'Complexity 2',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Advanced',
                        necesssity: 'Must learn'
                    },
                ]
            },
            {
                id: 'module_1',
                title: 'Foundational Algorithm Design Paradigms',
                topics: [
                    {
                        id: 'recursion',
                        title: 'Recursion',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Beginner',
                        necesssity: 'Must learn'
                    },
                    {
                        id: 'backtracking',
                        title: 'Backtracking',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Intermediate',
                        necesssity: 'Must learn'
                    },
                    {
                        id: 'branch-and-bound',
                        title: 'Branch and Bound',
                        description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
                        total_lessons: 3,
                        difficulty: 'Intermediate',
                        necesssity: 'Must learn'
                    },
                ]
            },
            {
                id: 'module_2',
                title: 'Advanced Algorithm Design Paradigms',
            },
            {
                id: 'module_3',
                title: 'Linear Data Structures'
            },
            {
                id: 'module_4',
                title: 'Naive sorting algorithms'
            },
            {
                id: 'module_5',
                title: 'Hash Table, Heap, Priority Queue'
            },
        ]
    },
    topicsProgress: {
        'course-intro': { completedLessons: 2 },
        'bigo-notation': { completedLessons: 1 },
        'complexity': { completedLessons: 1 },
        'recursion': { completedLessons: 1 },
        'backtracking': { completedLessons: 2 },
        'branch-and-bound': { completedLessons: 3 }
    },
    practices: {
        'module_0': [
            {
                id: 'introduction',
                title: 'Introduction',
                problems: [
                    {
                        id: 'RABT',
                        title: 'Reverse a binary tree',
                        difficulty: 'Easy',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                            {
                                id: 'amazon',
                                name: 'Amazon',
                            }
                        ],
                        total_accepted: 3,
                        status: {
                            result: 'Accepted',
                        }
                    },
                    {
                        id: 'KL01',
                        title: 'Find K-th largest element in an array',
                        difficulty: 'Medium',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                        ],
                        total_accepted: 3424,
                        status: {
                            result: 'Rejected',
                            rejectedReason: 'Wrong Answer',
                        }
                    },
                    {
                        id: 'LRUC',
                        title: 'Design LRU cache',
                        difficulty: 'Hard',
                        companies: [
                            {
                                id: 'sea-corp',
                                name: 'Sea Corp',
                            },
                        ],
                        total_accepted: 892,
                        status: {
                            result: 'Unsolved',
                        }
                    },
                ]
            },
            {
                id: 'complexity',
                title: 'Complexity',
                problems: [
                    {
                        id: 'RABT',
                        title: 'Reverse a binary tree',
                        difficulty: 'Easy',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                            {
                                id: 'amazon',
                                name: 'Amazon',
                            }
                        ],
                        total_accepted: 3,
                        status: {
                            result: 'Accepted'
                        }
                    },
                    {
                        id: 'KL01',
                        title: 'Find K-th largest element in an array',
                        difficulty: 'Medium',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                        ],
                        total_accepted: 3424,
                        status: {
                            result: 'Rejected',
                            rejectedReason: 'Wrong Answer'
                        }
                    },
                    {
                        id: 'LRUC',
                        title: 'Design LRU cache',
                        difficulty: 'Hard',
                        companies: [
                            {
                                id: 'sea-corp',
                                name: 'Sea Corp',
                            },
                        ],
                        total_accepted: 892,
                        status: {
                            result: 'Unsolved',
                        }
                    },
                ]
            }
        ],
        'module_1': [
            {
                id: 'basic-recursion',
                title: 'Basic recursion',
                problems: [
                    {
                        id: 'RABT',
                        title: 'Reverse a binary tree',
                        difficulty: 'Easy',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                            {
                                id: 'amazon',
                                name: 'Amazon',
                            }
                        ],
                        total_accepted: 3,
                        status: {
                            result: 'Accepted',
                        }
                    },
                    {
                        id: 'KL01',
                        title: 'Find K-th largest element in an array',
                        difficulty: 'Medium',
                        companies: [
                            {
                                id: 'google',
                                name: 'Google',
                            },
                        ],
                        total_accepted: 3424,
                        status: {
                            result: 'Rejected',
                            rejectedReason: 'Wrong Answer',
                        }
                    },
                    {
                        id: 'LRUC',
                        title: 'Design LRU cache',
                        difficulty: 'Hard',
                        companies: [
                            {
                                id: 'sea-corp',
                                name: 'Sea Corp',
                            },
                        ],
                        total_accepted: 892,
                        status: {
                            result: 'Unsolved',
                        }
                    },
                ]
            },
        ]
    },
    tip: {
        id: 'tip-id',
        content: 'Fusce ut placerat orci nulla. Diam volutpat commodo sed egestas egestas. Enim blandit volutpat maecenas volutpat. Nam aliquam sem et tortor. Viverra ipsum nunc aliquet bibendum. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Vel turpis nunc eget lorem dolor sed viverra ipsum. Fames ac turpis egestas sed tempus urna et.',
    },
    courseLeaderboard: {
        topUsers: [
            {
                ranking: 1,
                avatarSrc: '',
                name: 'Jolie Lorem Ipsum',
                progress: 100,
            },
            {
                ranking: 2,
                avatarSrc: '',
                name: 'Nhan Nguyen',
                progress: 89,
            },
            {
                ranking: 3,
                avatarSrc: '',
                name: 'Adannaya Lena',
                progress: 65,
            },
            {
                ranking: 4,
                avatarSrc: '',
                name: 'Tarik Emmy',
                progress: 60,
            },
            {
                ranking: 5,
                avatarSrc: '',
                name: 'Volker Ursula',
                progress: 55,
            },
        ],
        currentUser: {
            ranking: 3,
            avatarSrc: '',
            name: 'Adannaya Lena',
            progress: 65,
        },
    },
    topics: {
        'course-intro': {
            id: 'course-intro',
            title: 'Course Introduction',
            description: 'Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet. Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet',
            total_lessons: 3,
            difficulty: 'Beginner',
            necesssity: 'Must learn',
            lessons: [
                {
                    id: 'introduction-0',
                    title: 'Ac tincidunt vitae semper',
                },
                {
                    id: 'introduction-1',
                    title: 'Magna fringilla urna porttitor rhoncus dolor',
                },
                {
                    id: 'introduction-2',
                    title: 'Placerat in egestas',
                },
                {
                    id: 'introduction-3',
                    title: 'Mi bibendum neque egestas congue',
                }
            ],
            completed_lessons: 2
        }
    },
    topicLessons: {
        'course-intro': {
            'introduction-0': {
                id: 'introduction-0',
                title: 'Ac tincidunt vitae semper',
                blocks: [],
            },
            'introduction-1': {
                id: 'introduction-1',
                title: 'Magna fringilla urna porttitor rhoncus dolor',
                blocks: [],
            },
            'introduction-2': {
                id: 'introduction-2',
                title: 'Placerat in egestas',
                blocks: [
                    {
                        type: 'Markdown',
                        stop: true,
                        content: `
## C Programming

C is a **general-purpose programming** language that has been around for nearly 50 years.

C has been used to write everything from operating systems (including Windows and many others) to complex programs like the Python interpreter, Git, Oracle database, and more.

### Hello World

~~~cpp
#include <iostream>
#include <vector>
using namespace std;

struct Node {
	Node* above;
	Node* below;
	int val;
	Node(int val) : above(NULL), below(NULL), val(val) {}
};

class Stack {
private:
	Node* top;
	Node* bottom;
	int capacity;
	int size;

	void join(Node* above, Node* below) {
		if (above != NULL) above->below = below;
		if (below != NULL) below->above = above;
	}

public:
	Stack(int capacity) : top(NULL), bottom(NULL), capacity(capacity), size(0) {}

	bool isFull() {
		return size == capacity;
	}

	void push(int x) {
		if (isFull()) {
			cout << "Push: stack is full!\\n";
			exit(1);
		}
		Node* n = new Node(x);
		if (++size == 1) bottom = n;
		join(n, top);
		top = n;
	}

	int pop() {
		if (isEmpty()) {
			cout << "Pop: stack is empty!\\n";
			exit(1);
		}
		Node* n = top;
		int ret = n->val;
		top = top->below;
		if (top) top->above = NULL;
		delete n;
		size--;
		return ret;
	}

	bool isEmpty() {
		return size == 0;
	}

	int removeBottom() {
		if (isEmpty()) {
			cout << "Remove bottom: stack is empty!\\n";
			exit(1);
		}
		Node* n = bottom;
		int ret = n->val;
		bottom = bottom->above;
		if (bottom != NULL) bottom->below = NULL;
		delete n;
		size--;
		return ret;
	}
};

class SetOfStacks {
private:
	vector<Stack*> stacks;
	int capacity;  // Capacity of each stack in set

	Stack* getLastStack() {
		return stacks.empty() ? NULL : stacks.back();
	}

public:
	SetOfStacks(int capacity) : capacity(capacity) {}

	void push(int x) {
		Stack* last = getLastStack();
		if (last == NULL || last->isFull()) {
			Stack* stack = new Stack(capacity);
			stack->push(x);
			stacks.push_back(stack);
		} else {
			last->push(x);
		}
	}

	int pop() {
		Stack* last = getLastStack();
		if (last == NULL) {
			cout << "Pop: stack is empty!\\n";
			exit(1);
		}
		int ret = last->pop();
		if (last->isEmpty()) stacks.pop_back();  // This is important, the logic here is
												 // we don't keep empty stack in our set
		return ret;
	}

	int popAt(int index) {
		return leftShift(index, true);
	}

	int leftShift(int index, bool removeTop) {
		Stack* stack = stacks[index];
		int removedItem;
		if (removeTop) removedItem = stack->pop();
		else removedItem = stack->removeBottom();
		if (stack->isEmpty()) {
			stacks.erase(stacks.begin() + index);
		} else if (index + 1 < stacks.size()) {
			int v = leftShift(index + 1, false);
			stack->push(v);
		}
		return removedItem;
	}
};

int main() {
	SetOfStacks s(2);

	s.push(1);
	cout << s.pop() << '\\n';  // Should be 1

	s.push(1);
	s.push(2);
	s.push(3);
	cout << s.pop() << '\\n';  // Should be 3

	s.push(3);
	s.push(4);  // s is now [1 2] [3 4]
	cout << s.popAt(0) << '\\n';  // Should be 2

	s.push(5);  // s is now [1 3] [4 5]
	cout << s.popAt(1) << '\\n';  // Should be 5

	return 0;
}
~~~

- \`#include<stdio.h>\` The function used for generating output is defined in stdio.h. In order to use the \`printf\` function, we need to first include the required file, also called a **header file**.
- Read more: https://cplusplus.com.

### Data Types
                        `
                    },
                    {
                        type: 'Markdown',
                        stop: true,
                        content: `
Here is some JavaScript code:

~~~js
console.log('It works!')  // highlight-line
~~~
                        `
                    },
                    {
                        type: 'Markdown',
                        stop: true,
                        content:  `
Here is some JavaScript code:

~~~js
console.log('It works!')  // highlight-line
~~~
                        `
                    }
                ],
            },
            'introduction-3': {
                id: 'introduction-3',
                title: 'Mi bibendum neque egestas congue',
                blocks: [],
            }
        }
    },
    problems: {
        'KL01': {
            id: 'KL01',
            title: 'Find K-th largest element in an array',
            difficulty: 'Medium',
            companies: [
                {
                    id: 'google',
                    name: 'Google',
                },
            ],
            total_accepted: 3424,
            statement: `
Given an **integer** array \`nums\` and an integer \`k\`, return the \`kth\` largest element in the array.

Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.
    `,
            test_cases: [
`<pre>
<b>Input</b>: <span>nums = [3,2,1,5,6,4], k = 2</span>
<b>Output</b>: <span>5</span>
</pre>
`,
`<pre>
<b>Input</b>: <span>nums = [3,2,3,1,2,4,5,5,6], k = 4</span>
<b>Output</b>: <span>4</span>
<b>Explanation</b>: Neque porro quisquam est qui Dolores Ipsum quia dolor sit amet.
</pre>
`
            ],
            constraints: `
- <pre>1 <= k <= nums.length <= 10<sup>4</sup></pre>
- <pre>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></pre>
            `,
            hints: [
                'Lorem ipsum',
                'Lorem ipsum',
            ]
        }
    }
}
