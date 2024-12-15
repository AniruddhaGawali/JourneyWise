const Package = require('../model/package');

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();

    res.json(packages);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    res.json(package);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.createPackage = async (req, res) => {
  const package = new Package({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    destination: req.body.destination,
    availableDates: req.body.availableDates,
  });

  try {
    const savedPackage = await package.save();
    res.json(savedPackage);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          imageUrl: req.body.imageUrl,
          destination: req.body.destination,
          availableDates: req.body.availableDates,
        },
      },
      {
        new: true,
      }
    );
    console.log(updatedPackage);
    res.json(updatedPackage);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const removedPackage = await Package.deleteOne({ _id: req.params.id });

    res.json(removedPackage);
  } catch (error) {
    res.json({ message: error });
  }
};
