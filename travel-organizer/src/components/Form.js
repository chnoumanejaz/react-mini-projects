import { useState } from "react";
import Swal from "sweetalert2";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handlSubmit(e) {
    e.preventDefault();
    if (description.trim() === '') {
      Swal.fire('Please write some item 🙄');
      return;
    }
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlSubmit}>
      <h3>What do you need for your trip? 🤔</h3>
      <select value={quantity} onChange={q => setQuantity(+q.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item .."
        value={description}
        onChange={des => setDescription(des.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
