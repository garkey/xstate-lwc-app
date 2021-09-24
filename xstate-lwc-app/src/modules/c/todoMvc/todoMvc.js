import { LightningElement, api, track } from 'lwc';
import { todosMachine } from './todosMachine';
import { xstate } from 'c/xstatebase';

const { interpret } = xstate;

const persistedTodosMachine = todosMachine.withConfig(
    {
        actions: {
            persist: (ctx) => {
                localStorage.setItem('todos-xstate', JSON.stringify(ctx.todos));
            }
        }
    },
    // initial state from localstorage
    {
        todo: 'Learn state machines',
        todos: (() => {
            try {
                return JSON.parse(localStorage.getItem('todos-xstate')) || [];
            } catch (e) {
                return [];
            }
        })(),
        filter: 'all'
    }
);

function filterTodos(filter, todos) {
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

function addHashListener(onHashChange) {
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
}

export default class TodoMVC extends LightningElement {
    service;
    allCompleted;
    mark;
    @track state;

    connectedCallback() {
        this.service = interpret(persistedTodosMachine)
            .onTransition((s) => {
                this.calcMark(s.context.todos);
                this.state = s;
            })
            .start();

        const { todos } = this.state.context;
        addHashListener(this.navigateFilter);
        this.navigateFilter();
        this.calcMark(todos);
    }

    navigateFilter = () => {
        this.service.send({
            type: 'SHOW',
            filter: window.location.hash.substring(1) || 'all'
        });
    };

    calcMark(todos) {
        const numActiveTodos = todos.filter((todo) => !todo.completed).length;
        this.allCompleted = todos.length > 0 && numActiveTodos === 0;
        this.mark = !this.allCompleted ? 'completed' : 'active';
    }

    newTodo(e) {
        if (e.key === 'Enter') {
            this.service.send({
                type: 'NEWTODO.COMMIT',
                value: e.target.value
            });
        } else {
            this.service.send({
                type: 'NEWTODO.CHANGE',
                value: e.target.value
            });
        }
    }

    markEvents() {
        const markEvent = `MARK.${this.mark}`;
        this.service.send(markEvent);
        this.calcMark(this.state.context.todos);
    }

    clearCompleted() {
        this.service.send('CLEAR_COMPLETED');
    }

    @api get showCount() {
        return this.numActiveTodos > 0;
    }

    @api get plural() {
        return this.numActiveTodos === 1 ? '' : 's';
    }

    @api get classFilterAll() {
        return this.service.state.context.filter === 'all' ? 'selected' : '';
    }
    @api get classFilterActive() {
        return this.service.state.context.filter === 'active' ? 'selected' : '';
    }
    @api get classFilterCompleted() {
        return this.service.state.context.filter === 'completed'
            ? 'selected'
            : '';
    }

    @api get filteredTodos() {
        const { filter, todos } = this.state.context;
        return filterTodos(filter, todos);
    }

    @api get markLabel() {
        return `Mark all as ${this.mark}`;
    }

    @api get numActiveTodos() {
        return this.state.context.todos.filter((todo) => !todo.completed)
            .length;
    }

    @api get showClearCompleted() {
        return this.numActiveTodos < this.state.context.todos.length;
    }

    @api get debugout() {
        return JSON.stringify(this.state.context, null, 4);
    }
}
