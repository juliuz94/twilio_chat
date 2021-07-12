const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} style={{padding: '3rem 0', margin: '1rem'}}>
      <h2>Ingresa a la video consulta</h2>
      <div>
        <label htmlFor="name">Tu nombre:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">ID de la consulta:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Lobby;