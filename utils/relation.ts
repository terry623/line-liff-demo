const getRelation = async (props: { userId: string }) => {
  try {
    const response = await fetch(`/api/relation?userId=${props.userId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createRelation = async (props: { userId: string; code: string }) => {
  try {
    const res = await fetch("/api/relation", {
      method: "POST",
      body: JSON.stringify(props),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getRelation, createRelation };
