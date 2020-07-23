import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    id: { type: GraphQLID },
  },
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    id: { type: GraphQLID },
    query: { type: QueryType }
  },
});

export const data = Array(3).fill(undefined).map((_, i) => ({
  id: i,
  query: {
    id: i
  }
}));

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    items: {
	    type: new GraphQLList(ItemType),
	    resolve: () => data,
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQueryType });
