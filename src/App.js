import React from "react";
import { gql, useQuery } from "@apollo/client";
import { data as schemaData } from './graphql/schema';

const ALL_ITEMS = gql`
  query Items {
    items {
      id
      query {
        id
      }
    }
  }
`;

export default function App() {
  const {
    loading,
    error,
    data
  } = useQuery(ALL_ITEMS);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Incorrect query results</h2>
      <p>
        If the <code>__typename</code> <code>Query</code> is used, caching will
        fail to look up the correct values. For the query
        <pre>
          {ALL_ITEMS.loc.source.body}
        </pre>
        the data returned for the graphql operation is
        <pre>
          {JSON.stringify(schemaData, null, 2)}
        </pre>
        but the <code>data</code> from <code>useQuery</code> is:
      </p>
      {loading ? (
        <p>Loading…</p>
      ) : error ?(
        <p>Error: {String(error)}</p>
      ) : (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
