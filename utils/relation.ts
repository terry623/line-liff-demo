type Props = {
  userId: string;
  code: string;
};

const createRelation = async (props: Props) => {
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

export { createRelation };
