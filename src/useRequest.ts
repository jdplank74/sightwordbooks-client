import { DocumentNode, useQuery, useMutation, OperationVariables, QueryHookOptions, QueryResult, FetchResult } from "@apollo/react-hooks";
import { IBook } from "./types/IBook";
import { IPage } from "./types/IPage";
import { IBooks } from "./types/IBooks";
import { Book } from "./types/Book";
import { ISightwordGroup } from "./types/ISightwordGroup";

export function useBooksQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IBooks>(gqlQuery);
  return { loading, error, data };
}

export function usePagesQuery(gqlQuery: DocumentNode, id: string) {
  const options : QueryHookOptions = {
    variables: {
      id
    },
  };

  const result : QueryResult = useQuery<IPage>(gqlQuery, options);

  if(result.data)
    return {loading: result.loading, error: result.error, data: result.data.pageById};
  else 
    return {loading: result.loading, error: result.error, data: undefined};
}

export function useSightwordsQuery(gqlQuery: DocumentNode)
{
  const result : QueryResult = useQuery<ISightwordGroup>(gqlQuery);

  if(result.data)
    return {loading: result.loading, error: result.error, data: result.data.sightwordgroups};
  else 
    return {loading: result.loading, error: result.error, data: undefined};
}

export function useBookMutation(gqlMutation: DocumentNode)
{
  return useMutation(gqlMutation);
}

export function useSetCoverImageMutation(gqlMutation: DocumentNode)
{
  return useMutation(gqlMutation);
}