import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { IUser } from "src/reducers/userReducers";
import { IRoom } from "../../reducers/roomReducer";
import * as _ from "lodash";

interface IProps {
  user: IUser;
  leaveRoomHandler: any;
  room: IRoom;
}

const ModalModalExample: React.FC<IProps> = (props) => {
  const leaveRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.leaveRoomHandler(props.user);
  };

  let looser: boolean = false;
  let winner: boolean = false;
  let i = 0;

  if (props.room.isPrivate === true) {
    if (props.user.gameOver === true) {
      looser = true;
    }
  } else {
    _.forEach(props.room.players, (o: IUser) => {
      if (o.gameOver === true && o.id !== props.user.id) {
        i += 1;
      }
    });
    if (!props.user.gameOver && i === props.room.players.length - 1) {
      winner = true;
    } else if (
      props.user.gameOver === true &&
      i !== props.room.players.length - 1
    ) {
      looser = true;
    }
  }

  if (i === props.room.players.length - 1 && props.room.isPrivate === false) {
    winner = true;
    props.user.gameOver = true;
  }

  if (looser === true) {
    return (
      <div className="ModalLoose">
        <Modal open={props.user.gameOver}>
          <Modal.Header>
            <h3>You loose this game</h3>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>
                <h4>Keep playing and win next time !</h4>
              </Header>
              <p>You maybe gonna get more luck the next time see you soon</p>
            </Modal.Description>
            <Modal.Actions>
              <Button className="buttonLeave" onClick={leaveRoom}>
                <p>Return to HomePage</p>
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    );
  } else if (winner === true) {
    return (
      <div className="ModalWin">
        <Modal open={winner}>
          <Modal.Header>
            <h3>You win this game</h3>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>
                <h4>Keep playing and stay at the top next time !</h4>
              </Header>
              <p>You destroy your opponents this time ! Launch a new game !</p>
            </Modal.Description>
            <Modal.Actions>
              <Button className="buttonLeave" onClick={leaveRoom}>
                <p>Return to HomePage</p>
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
  return (
    <div className="Goodgame">
      <p style={{ color: "#31E981" }}>Good Game</p>
    </div>
  );
};

export default ModalModalExample;
