import React, { useState } from 'react';
import '../styles/adminmenu.css';


const EditMenuItemForm = ({ item, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    itemName: item.itemName || '',
    category: item.category || '',
    description: item.description || '',
    price: item.price || '',
    isFeatured: item.isFeatured || false
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
    formData.append('ItemName', form.itemName);
    formData.append('Category', form.category);
    formData.append('Description', form.description);
    formData.append('Price', form.price);
    if (imageFile) formData.append('imageUrl', imageFile); //backend image
    formData.append('IsFeatured', form.isFeatured || false);

    try {
      const response = await fetch(`http://localhost:5287/api/Menu/${item.itemId}`, { //add PUT API for menu
        method: 'PUT', 
        body: formData,
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
        name="itemName"
        value={form.itemName}
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
      <label>
      <input
        type="checkbox"
        name="isFeatured"
        checked={form.isFeatured}
        onChange={handleChange}
      />
      Featured Item
      </label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Update Item</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditMenuItemForm;