import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

import { IUser } from "../../reducers/userReducers";
// test for pushing

interface IProps {
  emitJoinRoom: any;
  user: IUser;
}

const FormHomePage: React.SFC<IProps> = props => {
  const [form, setForm] = useState({
    name: "",
    room_id: ""
  });

  const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ name: e.target.value, room_id: form.room_id });
    props.user!.userName = e.target.value;
  };

  const roomIdChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ name: form.name, room_id: e.target.value });
    props.user!.roomId = e.target.value;
  };

  const submitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.emitJoinRoom(props.user);
    setForm({ name: "", room_id: "" });
  };

  return (
    <Form id="formToSubmit" onSubmit={submitted}>
      <Form.Field>
        <h3 style={{ color: "#31E981" }}>
          UserName
        </h3>
        <input placeholder="UserName" name="userName" onChange={nameChanged} value={form.name} />
      </Form.Field>
      <Form.Field>
        <h3 style={{ color: "#31E981" }}>
          Room Number
        </h3>
        <input placeholder="RoomNumber" name="roomId" onChange={roomIdChanged} value={form.room_id} />
      </Form.Field>
      <Button id="submitButton" disabled={!form.name || !form.room_id} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormHomePage;
