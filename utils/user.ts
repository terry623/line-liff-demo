const getDefaultProfile = () => {
  if (process.env.NODE_ENV === "development")
    return {
      userId: "5555555sadfasdfsadf",
      displayName: "林敏皓",
      pictureUrl:
        "https://profile.line-scdn.net/0hteEdVHMZK0poHTku57tVNRhNKCBLbHJYTH1tKVoYJi0BK2oZEygzL1QZcS0BeD8ZFH1kKV9IdH9kDlwsdkvXfm8tdX1RKmgdTXlkqw",
      statusMessage: "Hello World！",
    };

  return {
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
  };
};

export { getDefaultProfile };
