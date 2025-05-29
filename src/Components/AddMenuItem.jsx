import React, { useState } from 'react';

const AddMenuItemForm = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    item_name: '',
    category: '',
    description: '',
    price: '',
  });

  const [imageFile, setImageFile] = useState(null);

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
    
    formData.append('item_name', form.item_name);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('price', form.price);
    if (imageFile) formData.append('image_url', imageFile); // backend image

    try {
      const response = await fetch('/api/menu', { //add API for menu
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add item');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-menu-form">
        <h2>Add New Item</h2>
      <input
        type="text"
        name="item_name"
        placeholder="Item Name"
        value={form.item_name}
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
      <input
        type="file"
        accept="image/*" // backend img
        onChange={handleImageChange}
      />
      <button type="submit">Add Menu Item</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddMenuItemForm;