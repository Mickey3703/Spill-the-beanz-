import React, { useEffect, useState } from 'react';
import axios from 'axois';
import '../styles/adminmenu.css';

const AdminMenu = () => {
    //hold all menu items
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    //to edit the modal
    const [editItem, setEditItem] = useState(null);

    //to fetch menu items from backend API 
    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('insert api for menu items'); //add endpoint here
            setMenuItems(response.data);
        }
        catch (error){
            console.error('Error fetching menu items:', error);
        }
        finally {
            setLoading(false);
        }
    };

    //for deleting items
    const handleDelete = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this item?'))
            return;

        try {
            await axios.delete(`api for menu items ${itemId}`);
        }
        catch (error) {
            console.error('Unable to delete item:', error);
        }
    };

    //modal for editing items
    const handleEdit = () => {
        setEditingItem(item);
    };

    //to close modal and refresh items if edited
    const handleEditSuccess = () => {
        setEditingItem(null);
        fetchMenuItems(); //to refresh list
    };

    if (loading)
    return <p>Loading Menu Items...</p>;

    return (
        <div className="admin-menu">
            <h1>Manage Menu</h1>
            <div className="menu-grid">
                {menuItems.map(item => (
                    <div key={item.item_id} className="menu-card">
                        <img src={item.image_url} alt={item.item_name} className="meni-img" />
                        <h3>{item.item_name}</h3>
                        <p><strong>Category:</strong> {item.category?.category_name || 'Uncategorized'}</p>
                        <p>{item.description}</p>
                        <p><strong>Price:</strong> ${item.base_price.toFixed(2)}</p>

                        <div className="menu-actions">
                            <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                            <button onClick={() => handleDelete(item.item_id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* to edit the modal */}

            {editingItem && (
                <EditItemModal item={editItem} onClose={() => setEditingItem(null)} onSuccess={handleEditSuccess} />
            )}
        </div>
    );
};

export default AdminMenu;