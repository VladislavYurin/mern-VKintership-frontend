import React, { useState, useContext, FormEvent } from "react";
import { Context } from "../../App";
import { Form, Button } from "react-bootstrap";
import AlertPopup from "../AlertPopup/AlertPopup";

interface AddPostModalProps {
  changeAddPostPopupActive: (isActive: boolean) => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({ changeAddPostPopupActive }) => {
  const { api, setUser, user } = useContext(Context);

  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState<string>();

  const handler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let authorId = user?._id;
    if (authorId) {
      api
        .post({
          authorId: authorId,
          text: text,
          photo: photo,
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setError(undefined);
            setPhoto("");
            setText("");
            localStorage.setItem("userVKintership", JSON.stringify(data));
            setUser(data);
            changeAddPostPopupActive(false);
          }
        });
    }
  };

  return (
    <div className="popupBox active">
      <div className="popup">
        <div className="popupClose" onClick={() => changeAddPostPopupActive(false)}>
          x
        </div>
        <Form onSubmit={handler}>
          <Form.Group>
            <Form.Label>Текст:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bigInput"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Фото:</Form.Label>
            <Form.Control
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="bigInput"
            />
          </Form.Group>
          <Button variant="warning" type="submit" className="bigButton">
            Опубликовать
          </Button>
        </Form>
      </div>
      {error ? <AlertPopup error={error} /> : null}
    </div >
  );
};

export default AddPostModal;
