import { useState } from 'react';
import Swal from 'sweetalert2';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems(items => [...items, newItem]);
  }

  function handleDeleteItems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleReset() {
    if (items.length === 0) {
      Swal.fire('List is already cleared!');
      return;
    } else {
      Swal.fire({
        title: 'Are you sure? This action cant be undo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F71C17',
        cancelButtonColor: '#30C730',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'List is Now Clear. 😉', 'success');
          setItems(items => []);
        }
      });
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onReset={handleReset}
      />
      <Stats items={items} />
    </div>
  );
}
