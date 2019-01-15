//graphql.js 相关
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type Query {
    getDie(numSides: Int): RandomDie
  }
`);
// 该类继承 RandomDie GraphQL 类型
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
// root 提供所有 API 入口端点相应的解析器函数
var root = {
    getDie: function ({numSides}) {
      return new RandomDie(numSides || 6);
    }
}
//------------------------------------------------------------------------
var schema2 = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
  type Query {
    getMessage(id: ID!): Message
    getList: [Message]
  }
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`)
class Message {
    constructor(id, {content, author}) {
      this.id = id;
      this.content = content;
      this.author = author;
    }
}
var fakeDatabase = {};
var root2 = {
    getMessage: function ({id}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      return new Message(id, fakeDatabase[id]);
    },
    getList: function () {
        var list = []
        Object.keys(fakeDatabase).forEach(id=>{
            let mes = new Message(id, fakeDatabase[id])
            list.push(mes)
        })
      return list
    },
    createMessage: function ({input}) {
      var id = require('crypto').randomBytes(10).toString('hex');
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
    updateMessage: function ({id, input}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
};
//------------------------------------------------------------------------
var schema3 = buildSchema(`
    type Query {
        ip: String
    }
`);
function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}
var root3 = {
  ip: function (args, request) {
    return request.ip;
  }
};
//------------------------------------------------------------------------
var schema4 = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);
var fakeDatabase4 = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var root4 = {
  user: function ({id}) {
    return fakeDatabase4[id];
  }
};
//------------------------------------------------------------------------

var app = express();
// app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema2,
  rootValue: root2,
  graphiql: true,
  pretty: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');