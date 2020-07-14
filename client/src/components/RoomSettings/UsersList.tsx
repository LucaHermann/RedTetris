import React from "react";
import { List, Icon, Segment } from "semantic-ui-react";

import { IRoom } from "../../reducers/roomReducer";
import { IUser } from "../../reducers/userReducers";

interface IProps {
  room: IRoom;
  me: IUser;
  leaveRoomHandler: any;
}

const CharacterList: React.SFC<IProps> = props => {
  const users: IUser[] = props.room.players;
  const leaveRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: IUser) => {
    e.preventDefault();
    props.leaveRoomHandler(user);
  };

  return (
    <div className="userListStyle">
      <Segment>
        <List className="Charlist">
          <h3 style={{ color: "#31E981" }}>
            Players
        </h3>
          {users &&
            users.map(user => {
              return (
                <List.Item key={user.userName}>
                  <List.Content>
                    <Icon
                      circular
                      color={user.id === props.room.gameMaster.id ? "yellow" : "teal"}
                      name={user.id === props.room.gameMaster.id ? "star" : "user"}
                      size="small"
                    />
                  </List.Content>
                  <List.Content style={{ color: "#000000" }}>{user.userName}</List.Content>
                  <List.Content>
                    {props.me.id === user.id && (
                      <Icon
                        link
                        name="close"
                        color="red"
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => leaveRoom(e, props.me)}
                      />
                    )}
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </Segment>
    </div >
  );
};

export default CharacterList;
