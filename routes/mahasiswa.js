var express = require("express");
const Validator = require("fastest-validator");
var router = express.Router();

const { Mahasiswa } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
  const mahasiswas = await Mahasiswa.findAll();
  return res.json(mahasiswas);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const mahasiswa = await Mahasiswa.findByPk(id);
  return res.json(mahasiswa || {});
});

router.post("/", async (req, res, next) => {
  const schema = {
    name: "string|optional",
    nohp: "string|optional",
    alamat: "string|optional",
    jurusan: "string|optional",
    prestasi: "string|optional",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const mahasiswa = await Mahasiswa.create(req.body);

  res.json(mahasiswa);
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  let mahasiswa = await Mahasiswa.findByPk(id);

  if (!mahasiswa) {
    return res.json({
      message: "Product Not Found",
    });
  }
  const schema = {
    name: "string|optional",
    nohp: "string|optional",
    alamat: "string|optional",
    jurusan: "string|optional",
    prestasi: "string|optional",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  mahasiswa = await mahasiswa.update(req.body);
  res.json(mahasiswa);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const mahasiswa = await Mahasiswa.findByPk(id);

  if (!mahasiswa) {
    return res.json({
      message: "Product Not Found",
    });
  }

  await mahasiswa.destroy();

  res.json({
    message: "Product Success Delete ",
  });
});

module.exports = router;
