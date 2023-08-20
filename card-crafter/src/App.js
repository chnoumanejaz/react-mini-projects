import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function App() {
  return (
    <main className="main">
      <Toaster />
      <Header />
      <Sides />
    </main>
  );
}

function Header() {
  return <h1>🎴 Card Crafter 🎨</h1>;
}

function Sides() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [button, setButton] = useState('');
  const [making, setMaking] = useState(false);

  const dataToUse = {
    image,
    setImage,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    description,
    setDescription,
    button,
    setButton,
  };

  return (
    <div className="sides">
      <LeftSide dataToUse={dataToUse} making={making} setMaking={setMaking} />
      {making && <RightSide dataToUse={dataToUse} />}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="canvas-btn">
      {children}
    </button>
  );
}

function LeftSide({ dataToUse, setMaking, making }) {
  function handleMaking() {
    setMaking(!making);
    toast.success(making === true ? 'Closed 🙂' : 'Start making your card 😉');
  }
  return (
    <div className="leftside">
      <Button onClick={handleMaking}>
        {making ? 'Close Now' : 'Make a card'}
      </Button>
      {making && (
        <form action="" className="form">
          <div className="height-width">
            <div className="width">
              <label>Width</label>
              <input type="text" value="1208px" disabled />
            </div>
            <div className="height">
              <label>Height</label>
              <input type="text" value="796px" disabled />
            </div>
          </div>
          <label>Image Url</label>
          <input
            type="text"
            placeholder="Image url here ..."
            value={dataToUse.image}
            onChange={e => dataToUse.setImage(e.target.value)}
          />
          <label>Title</label>
          <input
            type="text"
            placeholder="Title here ..."
            value={dataToUse.title}
            onChange={e => dataToUse.setTitle(e.target.value)}
          />
          <label>Subtitle</label>
          <input
            type="text"
            placeholder="Subtitle here ..."
            value={dataToUse.subtitle}
            onChange={e => dataToUse.setSubtitle(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Description here ..."
            value={dataToUse.description}
            onChange={e => dataToUse.setDescription(e.target.value)}
          />
          <label>Button</label>
          <input
            type="text"
            placeholder="Button text here ..."
            value={dataToUse.button}
            onChange={e => dataToUse.setButton(e.target.value)}
          />
        </form>
      )}
    </div>
  );
}

function RightSide({ dataToUse }) {
  return (
    <div className="rightside">
      <div className="card">
        <img
          src={dataToUse.image}
          alt={
            dataToUse.image.trim() === ''
              ? 'Image will display here'
              : dataToUse.title
          }
        />
        <div className="card__details">
          <h2>
            {dataToUse.title.trim() !== ''
              ? dataToUse.title
              : 'Title will display here'}
          </h2>
          <h4>
            {dataToUse.subtitle.trim() !== ''
              ? dataToUse.subtitle
              : 'Subtitle will display here'}
          </h4>
          <p>
            {dataToUse.description.trim() !== ''
              ? dataToUse.description
              : 'Description will appear here'}
          </p>
          <button>
            {dataToUse.button.trim() !== ''
              ? dataToUse.button
              : 'Button text will appear here'}
          </button>
        </div>
      </div>
    </div>
  );
}
