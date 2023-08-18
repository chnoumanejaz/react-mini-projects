export default function Stats({ items }) {
  const totalItems = items.length;
  const totalPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((totalPacked / totalItems) * 100);

  return (
    <footer
      className="stats"
      style={
        percentage === 100 ? { backgroundColor: '#30C730', color: '#fff' } : {}
      }>
      <em>
        {percentage === 100
          ? 'You got everything! Get ready to go ✈'
          : totalItems === 0
          ? 'Start adding items for your trip 🤗'
          : ` You have
        ${totalItems < 2 ? ` ${totalItems} item` : ` ${totalItems} items`} on
        your list, and you already packed ${totalPacked} items (${percentage}%)`}
      </em>
    </footer>
  );
}
