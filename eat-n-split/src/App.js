import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const initialFriends = [
  {
    id: 118836,
    name: 'Nawaz',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Jameel',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(showAdd => !showAdd);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
    toast.success('New Friend Added!');
  }

  function handleSelection(friend) {
    setSelectedFriend(current => (current?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <Toaster />

      {/* <h1 className="logo">Eat-N-Split</h1> */}
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You have to give {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} have to give you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are settled</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmitAddFriend(e) {
    e.preventDefault();

    if (!name || !image) {
      toast.error('Please write something in both fields');
      return;
    }

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitAddFriend}>
      <label>👩‍🤝‍👩🏼 Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>🖼 Image URL: </label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend, setSelectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  function handleSubmit(e) {
    e.preventDefault();

    if (!billValue || !yourExpense) {
      toast.error('Please fill fields properly!');
      return;
    }
    onSplitBill(
      whoIsPaying === 'user' ? billValue - yourExpense : -yourExpense
    );
    setSelectedFriend(null);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💵 Bill value: </label>
      <input
        type="number"
        value={
          billValue > -1 ? billValue : toast.error('Bill value cannot be -ve')
        }
        onChange={e => setBillValue(Number(e.target.value))}
      />
      <label>💸 Your expense: </label>
      <input
        type="number"
        value={
          yourExpense >= 0
            ? yourExpense
            : toast.error('Your expense cannot be negative')
        }
        onChange={e =>
          setYourExpense(
            Number(e.target.value) > billValue
              ? yourExpense
              : Number(e.target.value)
          )
        }
      />
      <label>💰 {selectedFriend.name}'s expense: </label>
      <input type="number" disabled value={billValue - yourExpense} />
      <label>🤔 Who is paying the bill? </label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  );
}
