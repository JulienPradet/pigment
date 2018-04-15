import React from "react";
import Query from "./Query";

const ProgressiveQuery = ({ smallQuery, query, variables, children }) =>
  process.env.SERVER ? (
    <Query
      query={query}
      variables={variables}
      children={result =>
        children({ ...result, initialLoading: result.loading })
      }
    />
  ) : (
    <Query query={smallQuery} variables={variables}>
      {smallResult => {
        return (
          <Query query={query} variables={variables}>
            {result =>
              children({
                initialLoading: smallResult.loading,
                loading: result.loading,
                error: smallResult.error || result.error,
                data: result.loading ? smallResult.data : result.data
              })
            }
          </Query>
        );
      }}
    </Query>
  );

export default ProgressiveQuery;
