import type { RelationInfo } from "../types";

const getRelation = async (props: {
  userId: string;
}): Promise<RelationInfo> => {
  const res = await fetch(`/api/relation?userId=${props.userId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

const createRelation = async (props: {
  userId: string;
  code: string;
}): Promise<RelationInfo> => {
  const res = await fetch("/api/relation", {
    method: "POST",
    body: JSON.stringify(props),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export { getRelation, createRelation };
