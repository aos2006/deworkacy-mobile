import { Map, List, fromJS } from 'immutable';

const _ = require('lodash');

export class Form {
  constructor(...args) {
    const [
      schema = new Map({}),
      vertices = new List([]),
      edges = new List(new Array(999)),
      numberOfEdges = 0,
      isValid = true,
    ] = args;
    this.schema = new Map(schema);
    this.vertices = vertices;
    this.edges = edges;
    this.numberOfEdges = numberOfEdges;
    this.isValid = isValid;
    this.isLoading = false;
    this.setIn = (keyPath, val) =>
      new Form(
        this.schema.setIn(keyPath, val),
        this.vertices,
        this.edges,
        this.numberOfEdges,
        this.isValid,
      );
  }

  updateField(path, updater) {
    const field = this.get(path);
    const updated = _.update(this.schema, path, field => updater(field));
    return new Form(updated);
  }

  get(pathTo) {
    return _.get(this.schema, pathTo);
  }

  set(key, val) {
    _.update(this.schema, key, () => val);
    const self = this;
    return new Form(this);
  }

  validate(types) {
    this.vertices = this.vertices.map(f => ({
      ...f,
      field: types[f.type].reduce(
        (prev, current) =>
          prev.validate(
            { type: current.type, val: prev.val },
            state => {
              this.isValid = true;
              return state;
            },
            state => {
              this.isValid = false;
              return current.onError(state);
            },
          ),
        f.field,
      ),
    }));
    return new Form(
      this.schema,
      this.vertices,
      this.edges,
      this.numberOfEdges,
      this.isValid,
    );
  }

  field() {
    return this.lastUpdated.field;
  }

  addField(field) {
    this.vertices = this.vertices.push(field);
    this.edges = this.edges.set(field.id, new List([]));
    return this;
  }

  removeField(id) {
    const index = this.vertices.findIndex(f => f.id === id);

    if (~index) {
      this.vertices = this.vertices.splice(index, 1);
    }

    while (this.edges.get(id).size) {
      const adjacentVertex = this.edges.get(id).pop();
      this.removeEdge(adjacentVertex, id);
    }
  }

  removeEdge(id1, id2) {
    const index1 = this.edges.get(id1)
      ? this.edges.get(id1).findIndex(f => f.id === id2)
      : -1;
    const index2 = this.edges.get(id2)
      ? this.edges.get(id2).findIndex(f => f.id === id1)
      : -1;

    if (~index1) {
      this.edges = this.edges.get(id1).splice(index1, 1);
      this.numberOfEdges--;
    }

    if (~index2) {
      this.edges = this.edges.get(id2).splice(index2, 1);
    }
  }

  addEdge(id1, id2) {
    this.edges = this.edges.update(id1, state => state.push(id2));
    this.numberOfEdges++;
  }

  updateFieldDFS(vertex, fn) {
    if (!~this.vertices.findIndex(f => f.id === vertex)) {
      return new Error('Vertx not found');
    }
    const visited = [];
    this._traverseDFS(vertex, visited, fn);
    return new Form(
      this.schema,
      this.vertices,
      this.edges,
      this.numberOfEdges,
      this.isValid,
    );
  }

  get(id) {
    return this.vertices.find(f => f.id === id) || new Error('Vert not found');
  }

  _traverseDFS(vertex, visited, fn = null) {
    visited[vertex] = true;
    let i;
    if (this.edges.get(vertex) !== undefined) {
      i = this.vertices.findIndex(f => f.id === vertex);
      this.vertices = this.vertices.update(
        i,
        state => (fn ? { ...state, field: fn(state.field) } : state),
      );
    }
    for (let i = 0; i < this.edges.get(vertex).size; i++) {
      if (!visited[this.edges.get(vertex)[i]]) {
        this._traverseDFS(this.edges.get(vertex)[i], visited, fn);
      }
    }
  }

  updateFieldBFS(vertex, fn) {
    if (!~this.vertices.findIndex(f => f.id === vertex)) {
      return console.log('Vertex not found');
    }
    const queue = [];
    queue.push(vertex);
    const visited = [];
    visited[vertex] = true;
    let i;

    while (queue.length) {
      vertex = queue.shift();
      i = this.vertices.findIndex(f => f.id === vertex);
      this.vertices = this.vertices.update(
        i,
        state => (fn ? { ...state, field: fn(state.field) } : state),
      );
      for (let i = 0; i < this.edges.get(vertex).size; i++) {
        if (!visited[this.edges.get(vertex)[i]]) {
          visited[this.edges.get(vertex)[i]] = true;
          queue.push(this.edges.get(vertex)[i]);
        }
      }
    }
    return new Form(
      this.schema,
      this.vertices,
      this.edges,
      this.numberOfEdges,
      this.isValid,
    );
  }
}


export default Form;
