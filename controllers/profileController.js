import prisma from "../DB/db.config.js";

export const createProfile = async (req, res) => {
  const { userId } = req;
  console.log(userId);

  let {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    about,
    userType,
    longitude,
    latitude,
    selectProfession,
    companyName,
    licenseNumber,
    isFaceVerified,
    serviceRole,
  } = req.body;

  console.log("Request Body:", JSON.stringify(req.body, null, 2));

  if (
    !req.file ||
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !gender ||
    !address ||
    !about ||
    !userType ||
    !longitude ||
    !latitude
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const formattedDateOfBirth = new Date(dateOfBirth).toISOString();

    const longitudeFloat = parseFloat(longitude);
    const latitudeFloat = parseFloat(latitude);

    if (isNaN(longitudeFloat) || isNaN(latitudeFloat)) {
      return res
        .status(400)
        .json({ message: "Invalid longitude or latitude value" });
    }

    const checkUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!checkUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    let createProfile = await prisma.profile.create({
      data: {
        profileImage: req.file.path,
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        gender,
        address,
        about,
        userType,
        longitude: longitudeFloat,
        latitude: latitudeFloat,
        userId: userId,
      },
    });

    console.log(createProfile, "createProfilr");

    let service;
    if (userType === "USERSERVICES") {
        isFaceVerified = (isFaceVerified === "true") ? true : false;
      service = await prisma.userServices.create({
        data: {
          profileId: createProfile.id,
          selectProfession,
          companyName,
          licenseNumber,
          isFaceVerified,
          serviceRole,
         
        },
      });
      createProfile.services = service;
      console.log(service, "services");
    }
    res
      .status(200)
      .json({ message: "userServices created successfully", createProfile });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Server Error", error: error.message });
  }
};
