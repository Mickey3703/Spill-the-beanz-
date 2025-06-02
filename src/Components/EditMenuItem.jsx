import React, { useState } from 'react';

const EditMenuItemForm = ({ item, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    item_name: item.item_name || '',
    category: item.category || '',
    description: item.description || '',
    price: item.price || '',
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
    if (imageFile) formData.append('image_url', imageFile); //backend image

    try {
      const response = await fetch(`http://localhost:5287/api/Menu/${item.item_id}`, { //add PUT API for menu
        method: 'PUT', 
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update item');

      alert('Item updated successfully!');
      onSuccess();  
      onClose();    
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-menu-form">
      <h2>Edit Item</h2>
      <input
        type="text"
        name="item_name"
        value={form.item_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        step="0.01"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Update Item</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditMenuItemForm;