import React, { useState, useEffect } from 'react';
import '../styles/adminmenu.css';

const MenuItemForm = ({ initialData, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    price: '',
    isFeatured: false,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        itemName: initialData.itemName || '',
        category: initialData.category || '',
        description: initialData.description || '',
        price: initialData.price || '',
        isFeatured: initialData.isFeatured || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('ItemName', form.itemName);
    formData.append('Category', form.category);
    formData.append('Description', form.description);
    formData.append('Price', form.price);
    formData.append('IsFeatured', form.isFeatured);
    if (imageFile) formData.append('image_url', imageFile);

    try {
      const url = initialData
        ? `http://localhost:5287/api/Menu/${initialData.id}`
        : 'http://localhost:5287/api/Menu';

      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to submit');
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
      alert(`Item ${initialData ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error submitting item:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-menu-form">
      <h2>{initialData ? 'Edit' : 'Add'} Menu Item</h2>
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={form.itemName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        value={form.price}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        /> Featured Item
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">{initialData ? 'Update' : 'Add'} Menu Item</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default MenuItemForm;
