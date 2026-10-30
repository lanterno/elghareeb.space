import { describe, expect, test } from "bun:test";

import { parseEvent } from "./event";

describe("parseEvent", () => {
  test("keeps a well-formed event and fills the defaults", () => {
    expect(parseEvent('{"n":"outbound","p":"/work/","t":"https://github.com/lanterno"}')).toEqual({
      name: "outbound",
      path: "/work/",
      target: "https://github.com/lanterno",
      value: 1,
    });
    expect(parseEvent('{"n":"read","p":"/blog/a-post/","v":50}')).toEqual({
      name: "read",
      path: "/blog/a-post/",
      target: "",
      value: 50,
    });
  });

  test("rejects what is not an event", () => {
    expect(parseEvent("")).toBeUndefined();
    expect(parseEvent("not json")).toBeUndefined();
    expect(parseEvent("[]")).toBeUndefined();
    expect(parseEvent('{"p":"/"}')).toBeUndefined();
    expect(parseEvent('{"n":"Bad Name","p":"/"}')).toBeUndefined();
    expect(parseEvent('{"n":"x","p":"work"}')).toBeUndefined();
    expect(parseEvent('{"n":"x","p":"/","v":"50"}')).toBeUndefined();
    expect(parseEvent('{"n":"x","p":"/","t":7}')).toBeUndefined();
  });

  test("caps the size of what it stores", () => {
    expect(parseEvent(`{"n":"x","p":"/${"a".repeat(200)}"}`)).toBeUndefined();
    expect(parseEvent(`{"n":"x","p":"/","t":"${"a".repeat(900)}"}`)).toBeUndefined();
  });
});
