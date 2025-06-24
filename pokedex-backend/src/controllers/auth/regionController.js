const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRegion = async (req, res) => {
  const { name } = req.body;
  try {
    const region = await prisma.region.create({ data: { name } });
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar região", details: error });
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar regiões", details: error });
  }
};

const getRegionById = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await prisma.region.findUnique({ where: { id: Number(id) } });
    if (!region) return res.status(404).json({ error: "Região não encontrada" });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar região", details: error });
  }
};

const updateRegion = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await prisma.region.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar região", details: error });
  }
};

const deleteRegion = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.region.delete({ where: { id: Number(id) } });
    res.json({ message: "Região deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar região", details: error });
  }
};

module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
