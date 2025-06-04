import React, { useEffect, useState } from 'react';
import EditMenuItemForm from './Components/EditMenuItem';
import MenuItemForm from './Components/AddMenuItem';
import './styles/adminmenu.css';
 
const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchMenuItems();
  }, []);
 
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`http://localhost:5287/api/Menu`); // add API for menu
      const data = await response.json();
      setMenuItems(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
 
    try {
      const response = await fetch(`http://localhost:5287/api/Menu/${itemId}`, { //add API for menu
        method: 'DELETE',
      });
 
      if (!response.ok) throw new Error('Failed to delete item');
      fetchMenuItems(); // Refresh list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
 
  const handleEdit = (item) => {
    setEditingItem(item);
  };
 
  const handleEditSuccess = () => {
    setEditingItem(null);
    fetchMenuItems(); // Refresh list
  };
 
  if (loading) return <p>Loading menu items...</p>;
  if (error) return <p>Error: {error}</p>;
 
  return (
    <div className="admin-menu">
      <h1>Manage Menu</h1>
 
      <button onClick={() => setAddingItem(true)} className="add-button">+ Add New Item</button>
 
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.itemId} className="menu-card">
            <img src={`http://localhost:5287${item.imageUrl}`} alt={item.itemName} className="menu-img" />
            <h3>{item.itemName}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p>{item.description}</p>
            <p><strong>Price:</strong> R{parseFloat(item.price).toFixed(2)}</p>
 
            <div className="menu-actions">
              <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(item.itemId)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
 
      {addingItem && (
        <div className="modal-backdrop">
            <div className="modal-content">
            <MenuItemForm
                onClose={() => setAddingItem(false)}
                onSuccess={fetchMenuItems}
            />
            </div>
        </div>
        )}
 
      {editingItem && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <EditMenuItemForm
              item={editingItem}
              onClose={() => setEditingItem(null)}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AdminMenu;