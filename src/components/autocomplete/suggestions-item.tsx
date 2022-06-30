import { FunctionComponent } from "preact";
import { ISuperKeyOptional } from "../../types";

export const listItemType: {
  [index: string]: FunctionComponent<{ suggestion: ISuperKeyOptional }>;
} = {
  bookmark: ({ suggestion }) => (
    <>
      <span>{suggestion.title}</span> {": "}
      <br />
      <span className="text-gray-400">{suggestion.url}</span>
    </>
  ),
  history: ({ suggestion }) => (
    <>
      <span>{suggestion.title}</span> {": "}
      <br />
      <span className="text-gray-400">{suggestion.url}</span>
    </>
  ),
  key: ({ suggestion }) => (
    <>
      <span>{suggestion.key}</span> {": "}
      <span className="text-gray-400">{suggestion.url}</span>
    </>
  ),
};

export const searchHelperText = {
  bookmark: (_: any, value: string) => (
    <>
      <span className="text-green-500">@Bookmarks Search </span>

      {` ${value ? value.substring(1) : ""}`}
    </>
  ),
  history: (_: any, value: string) => (
    <>
      <span className="text-green-400">#History Search </span>

      {` ${value ? value.substring(1) : ""}`}
    </>
  ),
  key: (showSearchMessageUrl: any, value: string) =>
    !!showSearchMessageUrl && `${value} Search on ${showSearchMessageUrl}`,
};
