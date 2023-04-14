const getDefaultProfile = () => {
  if (process.env.NODE_ENV === "development")
    return {
      userId: "12345",
      displayName: "Mario",
      pictureUrl:
        "https://www.lego.com/cdn/cs/catalog/assets/bltb074ba96ec9d66cd/1/MarioIcon.png",
      statusMessage: "Woo-hoo, let's-a go!",
    };

  return {
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
  };
};

export { getDefaultProfile };
