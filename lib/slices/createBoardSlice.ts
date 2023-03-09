import { StateCreator } from 'zustand';
import { ModalID } from 'types/modal';
import produce from 'immer';

export interface BoardSlice {
    boards: Board[];
    addBoard: (board: Board) => number;
    deleteBoard: (boardId: number) => number | null;
    editBoard: (editedBoard: Board) => number;
    openAddNewBoardModal: () => void;
    openDeleteBoardModal: () => void;
    openEditBoardModal: () => void;

    getColumnByTaskId: (taskId: number) => Column | null;
    getTaskById: (taskId: number) => Task | null;
    addTask: (boardId: number, task: Task) => number;
    changeTaskStatus: (boardId: number, sourceColumnId: number, destinationColumnId: number, taskId: number) => void;
    updateTask: (boardId: number, task: Task) => number;
    deleteTask: (boardId: number, taskId: number) => void;
    editTask: (boardId: number, task: Task) => number;
    openAddNewTaskModal: () => void;
    openTaskDetailModal: () => void;
    openDeleteTaskModal: () => void;
    openEditTaskModal: () => void;
}

export const createBoardSlice: StateCreator<BoardSlice> = (set, get) => {
    let lastId = 0;

    const generateId = () => {
        lastId += 1;
        return lastId;
    };

    return ({
        boards: [
            {
                id: generateId(),
                name: 'Platform Launch',
                columns: [
                    {
                        id: generateId(),
                        'name': 'Todo',
                        'tasks': [
                            {
                                id: generateId(),
                                'title': 'Build UI for onboarding flow',
                                'description': '',
                                'status': 'Todo',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Sign up page',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Sign in page',
                                        'isCompleted': false
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Welcome page',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Build UI for search',
                                'description': '',
                                'status': 'Todo',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Search page',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Build settings UI',
                                'description': '',
                                'status': 'Todo',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Account page',
                                        'isCompleted': false
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Billing page',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'QA and test all major user journeys',
                                'description': 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
                                'status': 'Todo',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Internal testing',
                                        'isCompleted': false
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'External testing',
                                        'isCompleted': false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        'name': 'Doing',
                        'tasks': [
                            {
                                id: generateId(),
                                'title': 'Design settings and search pages',
                                'description': '',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Settings - Account page',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Settings - Billing page',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Search page',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Add account management endpoints',
                                'description': '',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Upgrade plan',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Cancel plan',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Update payment method',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Design onboarding flow',
                                'description': '',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Sign up page',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Sign in page',
                                        'isCompleted': false
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Welcome page',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Add search enpoints',
                                'description': '',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Add search endpoint',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Define search filters',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Add authentication endpoints',
                                'description': '',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Define user model',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Add auth endpoints',
                                        'isCompleted': false
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Research pricing points of various competitors and trial different business models',
                                'description': 'We know what we\'re planning to build for version one. Now we need to finalise the first pricing model we\'ll use. Keep iterating the subtasks until we have a coherent proposition.',
                                'status': 'Doing',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Research competitor pricing and business models',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Outline a business model that works for our solution',
                                        'isCompleted': false
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                                        'isCompleted': false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        'name': 'Done',
                        'tasks': [
                            {
                                id: generateId(),
                                'title': 'Conduct 5 wireframe tests',
                                'description': 'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Complete 5 wireframe prototype tests',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Create wireframe prototype',
                                'description': 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Create clickable wireframe prototype in Balsamiq',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Review results of usability tests and iterate',
                                'description': 'Keep iterating through the subtasks until we\'re clear on the core concepts for the app.',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Meet to review notes from previous tests and plan changes',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Make changes to paper prototypes',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Conduct 5 usability tests',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Create paper prototypes and conduct 10 usability tests with potential customers',
                                'description': '',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Create paper prototypes for version one',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Complete 10 usability tests',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Market discovery',
                                'description': 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Interview 10 prospective customers',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Competitor analysis',
                                'description': '',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Find direct and indirect competitors',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'SWOT analysis for each competitor',
                                        'isCompleted': true
                                    }
                                ]
                            },
                            {
                                id: generateId(),
                                'title': 'Research the market',
                                'description': 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
                                'status': 'Done',
                                'subtasks': [
                                    {
                                        id: generateId(),
                                        'title': 'Write up research analysis',
                                        'isCompleted': true
                                    },
                                    {
                                        id: generateId(),
                                        'title': 'Calculate TAM',
                                        'isCompleted': true
                                    }
                                ]
                            }
                        ]
                    }
                ],
            },
            {
                id: generateId(),
                name: 'Marketing Plan',
                columns: [],
            },
            {
                id: generateId(),
                name: 'Roadmap',
                columns: [],
            },
        ],
        addBoard: (board: Board) => {
            const boardId = generateId();
            set(produce((draft) => {
                const { name, columns } = board;

                draft.boards.push({
                    id: boardId,
                    name,
                    columns: columns.map(({ name }) => {
                        return {
                            id: generateId(),
                            name,
                            tasks: [],
                        };
                    }),
                });
            }))
            return boardId;
        },
        deleteBoard: (boardId: number) => {
            const { boards } = get();
            const prevBoardIndex = boards.findIndex((board) => board.id === boardId) - 1;
            const prevBoardId = prevBoardIndex >= 0 ? boards[prevBoardIndex].id :
                boards.length > 0 ? boards[1].id : null;
            set(produce((draft) => {
                const index = draft.boards.findIndex((board) => board.id === boardId);
                draft.boards.splice(index, 1);
            }));
            return prevBoardId;
        },
        editBoard: (editedBoard: Board) => {
            set(produce((draft) => {
                const board = draft.boards.find((board) => board.id === editedBoard.id);
                board.name = editedBoard.name;
                board.columns = board.columns.filter((column) =>
                    editedBoard.columns.some((newColumn) => newColumn.id === column.id)
                );

                editedBoard.columns.forEach((newColumn, index) => {
                    const column = board.columns.find(({ id }) => id === newColumn.id);
                    if (column) {
                        column.name = newColumn.name;
                    } else {
                        board.columns.splice(index, 0 ,{
                            id: newColumn.id,
                            name: newColumn.name,
                            tasks: [],
                        });
                    }
                });
            }));
            return editedBoard.id;
        },
        openAddNewBoardModal: () => {
            set({
                modalId: ModalID.ADD_NEW_BOARD,
                showModal: true,
            });
        },
        openDeleteBoardModal: () => {
            set({
                modalId: ModalID.DELETE_BOARD,
                showModal: true,
            });
        },
        openEditBoardModal: () => {
            set({
                modalId: ModalID.EDIT_BOARD,
                showModal: true,
            });
        },
        openAddNewTaskModal: () => {
            set({
                modalId: ModalID.ADD_NEW_TASK,
                showModal: true,
            });
        },
        getColumnByTaskId: (taskId: number) => {
            const { boards } = get();
            for (let i = 0; i < boards.length; ++i) {
                const board = boards[i];
                for (let j = 0; j < board.columns.length; ++j) {
                    const column = board.columns[j];
                    const taskIndex = column.tasks.findIndex((task) => task?.id === taskId);
                    if (taskIndex !== -1) {
                        return column;
                    }
                }
            }
            return null;
        },
        getTaskById: (taskId: number) => {
            const { boards } = get();
            for (let i = 0; i < boards.length; ++i) {
                const board = boards[i];
                for (let j = 0; j < board.columns.length; ++j) {
                    const column = board.columns[j];
                    const task = column.tasks.find((task) => task.id === taskId);
                    if (task) {
                        return task;
                    }
                }
            }
            return null;
        },
        addTask: (boardId: number, task: Task) => {
            let newId = generateId();
            set(produce((draft) => {
                const board = draft.boards.find(({ id: _id }) => _id === boardId);
                const column = board.columns.find(({ id: _id }) => _id === Number(task.status));
                column.tasks.push({
                    ...task,
                    id: newId,
                    status: column.name,
                });
            }));
            return newId;
        },
        changeTaskStatus: (boardId: number, sourceColumnId: number, destinationColumnId: number, taskId: number) => {
            set(produce((draft) => {
                const board = draft.boards.find(({ id: _id }) => _id === boardId);
                const sourceColumn = board.columns.find(({ id: _id }) => _id === sourceColumnId);
                const destinationColumn = board.columns.find(({ id: _id }) => _id === destinationColumnId);
                const sourceIndex = sourceColumn.tasks.findIndex(({ id: _id }) => _id === taskId);
                const destinationIndex = destinationColumn.tasks.length + 1;
                if (sourceIndex !== -1) {
                    const sourceTask = sourceColumn.tasks[sourceIndex];
                    sourceColumn.tasks.splice(sourceIndex, 1);
                    destinationColumn.tasks.splice(destinationIndex, 0, sourceTask);
                }
            }));
            return taskId;
        },
        updateTask: (boardId: number, task: Task) => {
            set(produce((draft) => {
                const board = draft.boards.find(({ id: _id }) => _id === boardId);
                const column = board.columns.find(({ id: _id }) => _id === Number(task.status));
                const oldTask = column.tasks.find(({ id: _id }) => _id === task.id);
                if (oldTask) {
                    oldTask.subtasks = task.subtasks;
                }
            }));
            return task.id;
        },
        deleteTask: (boardId: number, taskId: number) => {
            set(produce((draft) => {
                const taskColumn = draft.getColumnByTaskId(taskId);
                const board = draft.boards.find(({ id: _id }) => _id === boardId);
                const column = board.columns.find(({ id: _id }) => _id === taskColumn.id);
                column.tasks = taskColumn.tasks.filter(({ id }) => id !== taskId);
            }));
        },
        editTask: (boardId: number, task: Task) => {
            const { id: taskId } = task;
            const { getColumnByTaskId, changeTaskStatus } = get();
            const taskColumn = getColumnByTaskId(taskId);
            set(produce((draft) => {
                const board = draft.boards.find(({ id: _id }) => _id === boardId);
                const column = board.columns.find(({ id: _id }) => _id === taskColumn.id);
                const oldTask = column.tasks.find(({ id: _id }) => _id === taskId);
                oldTask.title = task.title;
                oldTask.description = task.description;
                oldTask.subtasks = task.subtasks;
            }));
            const columnId = Number(task.status);
            if (taskColumn && taskColumn.id !== columnId) {
                changeTaskStatus(boardId, taskColumn.id, columnId, taskId);
            }
            return task.id;
        },
        openTaskDetailModal: () => {
            set({
                modalId: ModalID.TASK_DETAIL,
                showModal: true,
            });
        },
        openDeleteTaskModal: () => {
            set({
                modalId: ModalID.DELETE_TASK,
                showModal: true,
            });
        },
        openEditTaskModal: () => {
            set({
                modalId: ModalID.EDIT_TASK,
                showModal: true,
            });
        },
    });
}
