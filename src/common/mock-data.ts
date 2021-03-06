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
                        total_lessons: 3,
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
        'course-intro': { completedLessons: 1 },
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
                avatarSrc: '',
                name: 'Jolie Lorem Ipsum',
                progress: 100,
            },
            {
                avatarSrc: '',
                name: 'Nhan Nguyen',
                progress: 89,
            },
            {
                avatarSrc: '',
                name: 'Adannaya Sigrid',
                progress: 65,
            },
            {
                avatarSrc: '',
                name: 'Tarik Emmy',
                progress: 60,
            },
            {
                avatarSrc: '',
                name: 'Volker Ursula',
                progress: 55,
            },
        ],
    }
}
