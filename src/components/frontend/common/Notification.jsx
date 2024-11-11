import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: "Thông báo 1",
      content: "Nội dung thông báo 1.",
      date: "2024-09-01"
    },
    {
      id: 2,
      title: "Thông báo 2",
      content: "Nội dung thông báo 2.",
      date: "2024-09-02"
    },
    {
      id: 3,
      title: "Thông báo 3",
      content: "Nội dung thông báo 3.",
      date: "2024-09-03"
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center">Thông Báo</h2>
      <ListGroup>
        {notifications.map(notification => (
          <ListGroup.Item key={notification.id}>
            <h5>{notification.title}</h5>
            <p>{notification.content}</p>
            <small>{notification.date}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Notification;
