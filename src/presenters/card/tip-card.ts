import { tipFetcher, TIP_QUERY_KEY } from "fetchers";
import { TPresenter } from "presenters/types";
import { usePresenterCreator } from "presenters/use-presenter-creator";
import { useQuery } from "react-query";

type TTipCardPresenterData = {
    id: string
    content: string
}
export type TTipCardPresenter = TPresenter<TTipCardPresenterData>
export function useTipCardPresenter(): TTipCardPresenter {
    return usePresenterCreator(
        () => useQuery(TIP_QUERY_KEY, tipFetcher),
        tip => tip
    )()
}