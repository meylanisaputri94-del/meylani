const Category = require('../models/categoryModel');

// GET: Ambil semua kategori milik user
getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user_id: req.user.id });
    res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// POST: Buat kategori baru
createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
      user_id: req.user.id,
    });
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// PUT: Update kategori
updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE: Hapus kategori
deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', message: 'Kategori berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
