const getUser = (Model) => async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Model.findById(id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
